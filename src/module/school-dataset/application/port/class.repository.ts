import { ClassEntity } from '../../adapter/persistence/entities/class.entity';
import { Grade } from '../../domain/constants/grade';

export abstract class ClassRepository {
  abstract upsertMany(classes: Partial<ClassEntity>[]): Promise<void>;
  abstract findBySchoolId(schoolId: number): Promise<ClassEntity[]>;
  abstract findBySchoolIdAndGrade(
    schoolId: number,
    grade: Grade,
  ): Promise<ClassEntity[]>;
  abstract findByNameAndGrade(
    schoolName: string,
    className: string,
    grade: Grade,
  ): Promise<ClassEntity | null>;
  abstract findAll(): Promise<ClassEntity[]>;
  abstract findByIdOrFail(id: number): Promise<ClassEntity>;
}
