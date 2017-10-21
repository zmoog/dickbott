export interface IHttpClient {
    get<T>(uri: string, parseJson?: boolean): Promise<T>;

    post<I, O>(uri: string, body: I): Promise<O>;
}
