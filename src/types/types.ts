export type AssetType = {
    id: number;
    sensors: string[];
    model: string;
    status: string;
    healthscore: number;
    name: string;
    image: URL;
    specifications: {
      maxTemp: number,
      power?: number,
      rpm?: number | null;
    };
    metrics: {
      totalCollectsUptime: number;
      totalUptime: number;
      lastUptimeAt: string;
    };
    unitId: number;
    companyId: number
};

export type UserType = {
  id: number,
  email: string,
  name: string,
  unitId: number,
  companyId: number
};

export type UnitType = Omit<UserType, 'email' | 'unitId'>;

export type CompanyType = Omit<UnitType, 'companyId'>;
