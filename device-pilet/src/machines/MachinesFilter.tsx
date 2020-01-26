import * as React from 'react';
import { SubscriptionLike } from 'rxjs';
import { IMachineInfo } from './Machine.interfaces';
import { MachineFilterService } from './MachineFilterService';

interface IProps {
  machineFilterService: MachineFilterService;
  machines: IMachineInfo[];
}

/**
 * HoC for filtering machine list
 */
export function withMachinesFilter(WrappedComponent: any): any {
  return class extends React.Component<IProps> {
    private query$?: SubscriptionLike;
    constructor(props: IProps) {
      super(props);
    }

    /**
     * React.Component
     */
    public componentDidMount() {
      this.query$ = this.props.machineFilterService.queryChange.subscribe(() => {
        this.forceUpdate();
      })
    }

    /**
     * React.Component
     */
    public componentWillUnmount(): void {
      if (this.query$) {
        this.query$.unsubscribe();
        this.query$ = undefined;
      }
    }

    /**
     * React.Component
     */
    public render(): React.ReactNode {
      return <WrappedComponent
        {...this.props}
        machines={this.props.machineFilterService.filterMachines(this.props.machines)}
      />
    }
  }
}
