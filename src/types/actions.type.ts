export type AppActionCreator<ACTION> = (params: Omit<ACTION, "type">) => ACTION;
