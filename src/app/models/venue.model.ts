export class Venue {
  constructor(public id: number, public sport: string, public name: string, public location?: string, public date?: Date) {}
  scheduled(): boolean {
    const isScheduled = this.location != null && this.date != null;
    return isScheduled;
  }
}
