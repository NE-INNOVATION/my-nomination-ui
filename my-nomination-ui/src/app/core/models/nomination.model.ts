export class Nomination {
    name: string;
    gender: string;
    enterpriseId: string;
    role: string;
    level: string;
    project: string;
    ia_ig: string;
    clientName: string;
    managerId: string;
    location: string;
    primarySkill: string;
    secondarySkill: string;
    programId: number;
  
    constructor() {
      this.name = '';
      this.gender = '';
      this.role = '';
      this.level = '';
      this.project = '';
      this.ia_ig = '';
      this.clientName = '';
      this.managerId = '';
      this.primarySkill = '';
      this.secondarySkill = '';
      this.programId = 0;
      this.location = '';
    }
  }