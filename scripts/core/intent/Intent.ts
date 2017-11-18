export interface Intent<I, O> {
    execute(executionId: string, entities?: I): Promise<O>;
    complete?<A>(actions: A, executionId: string, entities: I): Promise<O>;
}
