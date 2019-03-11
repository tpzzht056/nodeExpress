interface Status{
    code: number,
    msg: string,
    err?: Error,
    [data: string]: any
}