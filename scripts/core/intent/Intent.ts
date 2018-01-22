export interface Intent<I, O> {

    name?: string; 
    description?: string; 
    examples?: {
        Simple?: string
        Elegant?: string
    };
    docs_url?: string; 

    execute(executionId: string, entities?: I): Promise<O>;
    complete?<A>(actions: A, executionId: string, entities: I): Promise<O>;
}
