class NotFoundException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundException;
