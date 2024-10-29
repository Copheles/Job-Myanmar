
class CustomAPIError extends Error {
  constructor(public message: string){
    super(message)
  }
}

export default CustomAPIError