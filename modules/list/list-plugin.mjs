import { makeExtendSchemaPlugin } from "graphile-utils";
import { withPgClientTransaction } from "postgraphile/@dataplan/pg";
import { ListTypes } from "./list-types.mjs";


const ListPlugin = makeExtendSchemaPlugin((build) => {
  const { main: mainExecutor } = build.input.pgRegistry.pgExecutors;

  return {
    typeDefs: ListTypes,
    plans: {
      Mutation: {
        updateListByMovements(_, $context) {
          const $input =
            $context.get("input");
          const $updateStep = withPgClientTransaction(
            mainExecutor,
            $input,
            async (client, { moveItems, listName }) => {
              console.log("moveItems", moveItems.slice(0, 5));
              // If you run this code for first time, posrgraphile processes something about 30s to reach this point
              
              // here we are writing to the db, does not matter for this demonstration
              return {
                success: true,
              };
            }
          );

          return $updateStep;
        },
      },
    },
  };
});

export default ListPlugin;
