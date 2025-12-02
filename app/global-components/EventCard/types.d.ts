interface IEvent {
  id: string;
  userId: number;
  userImgUrl: string;
  name: string;
  startDate: string;
  endDate: string;
  sessions: ISession[];
  minPrice: number;
  maxPrice: number;
  place: string;
  updatedAt: string;
}

interface ISession {
  start: string;
  end: string;
}

export type { IEvent, ISession };
