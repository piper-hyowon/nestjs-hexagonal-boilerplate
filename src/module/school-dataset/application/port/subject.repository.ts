import { PaginatedList } from 'src/common/dto/response.dto';
import { CurriculumVersion } from '../../domain/constants/curriculum-version';
import { SubjectCategoryResponse } from '../../adapter/presenter/rest/dto/subject-categories.dto';

export abstract class SubjectRepository {
  /**
   * 교과 분류 조회
   * @param version 교육과정 개정시기
   * @param count 페이지당 목록 수
   * @param page 페이지 번호
   * @returns 교과 분류, 분류별 과목수
   */
  abstract findCategories(
    version: CurriculumVersion,
    count: number,
    page: number,
  ): Promise<PaginatedList<SubjectCategoryResponse>>;

  /**
   * 교과목록 조회
   * @param version 교육과정 개정시기
   * @param count 페이지당 목록 수
   * @param page 페이지 번호
   * @param filter 필터(교과 분류, 검색어) - 없을 경우 전체 목록 조회
   */
  abstract findSubjects(
    version: CurriculumVersion,
    count: number,
    page: number,
    filter: { category?: string; search?: string },
  ): Promise<PaginatedList<string>>;

  abstract findIdByName(name: string): Promise<number | null>;

  /**
   * 해당 과목명이 존재하는 교과목인지 확인
   * @returns 존재하는 과목명의 ID 목록
   */
  abstract findExistingIds(names: string[]): Promise<number[]>;
}
