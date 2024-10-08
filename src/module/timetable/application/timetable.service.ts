import { ClassRepository } from 'src/module/school-dataset/application/port/class.repository';
import { SubjectRepository } from 'src/module/school-dataset/application/port/subject.repository';
import { UserTimetableRepository } from 'src/module/timetable/application/repository/user-timetable.repository';
import { Injectable } from '@nestjs/common';
import { DefaultTimetableRepository } from './repository/default-timetable.repository';
import { DefaultTimetableEntity } from '../adapter/persistence/entities/default-timetable.entity';
import { DateUtilService } from 'src/module/util/date-util.service';
import { ContentNotFoundError } from 'src/common/types/error/application-exceptions';
import {
  DefaultTimetableRequest,
  EditOrAddTimetableRequest,
} from '../adapter/presenter/rest/dto/timetable.dto';
import { UserTimetableEntity } from '../adapter/persistence/entities/user-timetable.entity';
import { Weekday } from '../domain/value-objects/weekday';
import { Period } from '../domain/value-objects/period';
import { Semester } from 'src/module/school-dataset/domain/constants/semester';
import { SchoolDatasetService } from 'src/module/school-dataset/application/school-dataset.service';

@Injectable()
export class TimetableService {
  constructor(
    private readonly defaultTimetableRepository: DefaultTimetableRepository,
    private readonly dateUtilService: DateUtilService,
    private readonly userTimetableRepository: UserTimetableRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly classRepository: ClassRepository,
    private readonly schoolDatasetService: SchoolDatasetService,
  ) {}

  async findDefaultClassTimetable(
    params: DefaultTimetableRequest,
  ): Promise<DefaultTimetableEntity[] | null> {
    const { year, semester, schoolName, className, grade } = params;
    const classEntity = await this.classRepository.findByNameAndGrade(
      schoolName,
      className,
      grade,
    );
    if (!classEntity) {
      throw new ContentNotFoundError('class', `${schoolName} ${className}`);
    }

    const defaultTimetables =
      await this.defaultTimetableRepository.findDefaultClassTimetable(
        year,
        semester,
        classEntity.id,
      );

    return defaultTimetables;
  }

  /**
   * 회원가입시 기본 시간표를 설정(필요한 경우 Neis API 를 통해 가져옴)
   * 회원가입 시점 = 2월 ~ 7월 이면 1학기, 8월 ~ 1월 이면 2학기
   */
  async setUserDefaultTimetableWithFallbackFetch(
    userId: number,
    classId: number,
    //TODO: user id 만 받고, class id 는 user 에서 가져올지?
  ): Promise<void> {
    const today = new Date();
    const [thisYear, semester] =
      this.dateUtilService.getYearAndSemesterByDate(today);

    const defaultTimetables =
      await this.defaultTimetableRepository.findDefaultClassTimetable(
        thisYear,
        semester,
        classId,
      );

    // 해당 학급에 대해 기본 시간표가 있는 경우
    if (defaultTimetables?.length) {
      await this.userTimetableRepository.upsert(
        defaultTimetables.map((e) => Object.assign(e, { userId })),
      );
    } else {
      // 해당 학급에 대해 기본 시간표가 없는 경우(유저가 최초 가입한 경우)
      await this.schoolDatasetService.createDefaultTimetable(
        thisYear,
        semester,
        classId,
      );
      await this.setUserDefaultTimetableWithFallbackFetch(userId, classId);
    }
  }

  async findUserTimetable(
    userId: number,
    year: number,
    semester: Semester,
  ): Promise<UserTimetableEntity[] | null> {
    const userTimetables = await this.userTimetableRepository.find({
      userId,
      year,
      semester,
    });

    return userTimetables;
  }

  async editOrAddTimetable(params: EditOrAddTimetableRequest) {
    const { year, semester, userId, subjectName, day, period } = params;
    const subjectId = await this.subjectRepository.findIdByName(subjectName);
    if (!subjectId) {
      throw new ContentNotFoundError('subject', subjectName);
    }

    await this.userTimetableRepository.upsert({
      userId,
      year,
      semester,
      day,
      period,
      subjectId,
    });
  }

  async deleteTimetable(params: {
    userId: number;
    year: number;
    semester: Semester;
    day: Weekday;
    period: Period;
  }) {
    await this.userTimetableRepository.delete(params);
  }
}
