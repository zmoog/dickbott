export type Config = {
    project: string,
    environment: Environment
};

export type Environment = {
    supported: string[],
    current: string
};
