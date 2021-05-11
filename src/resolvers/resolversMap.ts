import { IResolvers } from "@graphql-tools/utils";
import query from "./query";
import type from "./types";

const resolversMap: IResolvers = {
    ...query,
    ...type
}

export default resolversMap;