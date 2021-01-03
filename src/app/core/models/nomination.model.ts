export class Nomination {
    name: string;
    gender: string;
    enterpriseId: string;
    role: string;
    level: string;
    project: string;
    ia_Ig: string;
    clientName: string;
    managerId: string;
    location: string;
    primarySkill: string;
    secondarySkill: string;
    programId: string;
    approved: boolean;
  
    constructor() {
      this.name = '';
      this.gender = '';
      this.role = '';
      this.level = '';
      this.project = '';
      this.ia_Ig = '';
      this.clientName = '';
      this.managerId = '';
      this.primarySkill = '';
      this.secondarySkill = '';
      this.programId = '';
      this.location = '';
      this.approved = false;
    }
  }
