export interface Intent<I = any, O = any> {
    execute(executionId: string, entities?: I): Promise<O>;
    complete?<A>(actions: A, executionId: string, entities: I): Promise<O>;
}
