
export class Chest {
  private id: string;
  private status: string;


  constructor(id: string) {
    this.id = id;
    this.status = '';
  }

  public isEmpty(): boolean {
    return this.status.includes('This chest is empty');
  }

  public setStatus(status : string): void {
    this.status = status;
  }

}
