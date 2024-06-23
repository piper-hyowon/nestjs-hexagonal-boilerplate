export class UserGrade {
  constructor(readonly value: 1 | 2 | 3) {}

  equals(grade: UserGrade) {
    return this.value === grade.value;
  }
}
