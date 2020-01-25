/**
 * The basic machine info.
 */
export interface IMachineInfo {
  id: string;
  status: string;
  machine_type: string;
  longitude: number;
  latitude: number;
  last_maintenance: string;
  install_date: string;
  floor: number;
}

/**
 * The machine event
 */
export interface IMachineEvent {
  machineId: string;
  timestamp: string;
  status: string;
}

/**
 * The machine details.
 */
export interface IMachineDetails extends Partial<IMachineInfo> {

  /**
   * Events related to the machine.
   */
  events?: IMachineEvent[];
}
