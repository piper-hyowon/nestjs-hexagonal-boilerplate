import { Expose } from 'class-transformer';
import { Grade } from './constants/grade';

// 학교별 학급
export class Class {
  @Expose()
  id: number;

  @Expose()
  schoolId: number;

  @Expose()
  grade: Grade;

  @Expose()
  name: number;
}
