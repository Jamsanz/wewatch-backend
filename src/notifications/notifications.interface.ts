export default interface INotification {
  title?: string;
  body?: string;
  userId?: string;
  data?: {};
  trigger?: { date?: Date };
  _id?: string;
  identifier?: string;
}