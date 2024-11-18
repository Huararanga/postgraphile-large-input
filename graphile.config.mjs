// @ts-check
import { makePgService } from "@dataplan/pg/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { makeV4Preset } from "postgraphile/presets/v4";
import { PostGraphileConnectionFilterPreset } from "postgraphile-plugin-connection-filter";
import { PgAggregatesPreset } from "@graphile/pg-aggregates";
import { PgManyToManyPreset } from "@graphile-contrib/pg-many-to-many";
// import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import { PgOmitArchivedPlugin } from "@graphile-contrib/pg-omit-archived";
import ListPlugin from "./modules/list/list-plugin.mjs";

// For configuration file details, see: https://postgraphile.org/postgraphile/next/config

/** @satisfies {GraphileConfig.Preset} */
const preset = {
  extends: [
    // PostGraphileAmberPreset,
    makeV4Preset({
      /* Enter your V4 options here */
      // graphiql: true,
      // graphiqlRoute: "/",
      appendPlugins: [
        ListPlugin,
      ]
    }),
    // PostGraphileConnectionFilterPreset,
    // PgManyToManyPreset,
    // PgAggregatesPreset,
    // PgSimplifyInflectionPreset
  ],
  // plugins: [PgOmitArchivedPlugin],
  pgServices: [
    makePgService({
      // Database connection string:
      connectionString: process.env.DATABASE_URL,
      // List of schemas to expose:
      schemas: process.env.DATABASE_SCHEMAS?.split(",") ?? ["public"],
      // Enable LISTEN/NOTIFY:
      pubsub: true,
    }),
  ],
  grafserv: {
    port: 5678,
    websockets: true,
    // allowUnpersistedOperation: true,
  },
  grafast: {
    explain: true,
  },
};

export default preset;
