import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { SchoolEntity } from './school.entity';
import { Grade } from 'src/module/school-dataset/domain/constants/grade';
import { BaseEntity } from 'src/config/database/orm/base.entity';

@Unique(['schoolId', 'grade', 'name'])
@Entity('class', { comment: '학교별 학급 정보' })
export class ClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  schoolId: number;

  @Column({ type: 'enum', enum: Grade, comment: '학년' })
  grade: Grade;

  @Column('varchar', { comment: '학급명' })
  name: string;

  @ManyToOne(() => SchoolEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;
}
