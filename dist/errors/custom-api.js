class CustomAPIError extends Error {
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export default CustomAPIError;
