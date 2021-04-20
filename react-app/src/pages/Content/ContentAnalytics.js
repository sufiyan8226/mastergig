import React from "react";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
class ContentAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 },
        { quarter: 5, earnings: 15000 },
      ],
    };
  }
  render() {
    return (
      <div>
        ContentAnalytics
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={[
              "Quarter 1",
              "Quarter 2",
              "Quarter 3",
              "Quarter 4",
              "Quarter 5",
            ]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => `$${x / 1000}k`}
          />
          <VictoryBar
            data={this.state.data}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="earnings"
          />
        </VictoryChart>
      </div>
    );
  }
}
export default ContentAnalytics;
