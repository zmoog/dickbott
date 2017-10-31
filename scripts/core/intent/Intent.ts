export interface Intent<I, O> {
    execute(entities?: I): Promise<O>;
    confirm?(entities?: I): Promise<O>;
}
