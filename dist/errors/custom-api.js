class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export default CustomAPIError;
