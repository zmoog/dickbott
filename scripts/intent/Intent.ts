export interface Intent<I, O> {
    execute(entities?: I): Promise<O>;
}
