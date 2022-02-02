type Icon = {
  signal: {
    type: string;
    name: string;
  };
  index: number;
};

export type Entity = {
  entity_number: number;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

export type Blueprint = {
  blueprint: {
    icons: Icon[];
    entities: Entity[];
    item: string;
    version: number;
  };
};
