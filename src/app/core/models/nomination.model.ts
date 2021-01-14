export class Nomination {
    name: string;
    enterpriseId: string;
    role: string;
    level: string;
    project: string;
    bussinessGroup: string;
    clientName: string;
    managerId: string;
    location: string;
    primarySkill: string;
    secondarySkill: string;
    programId: string;
    approved: boolean;
    approver: string;
  
    constructor() {
      this.name = '';
      this.role = '';
      this.level = '';
      this.project = '';
      this.bussinessGroup = '';
      this.clientName = '';
      this.managerId = '';
      this.primarySkill = '';
      this.secondarySkill = '';
      this.programId = '';
      this.location = '';
      this.approved = false;
      this.approver = '';
    }
  }
