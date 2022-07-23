import { Schedule } from "./schedule_builder"

export class Template {
  static build(schedule: Schedule) {
    const rows = Object.keys(schedule).map(name => schedule[name].map(timestamp => `['${name}', new Date(${timestamp}), new Date(${timestamp})]`).join()).filter(e => e);
    return `
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script type="text/javascript">
      google.charts.load("current", {packages:["timeline"]})
      google.charts.setOnLoadCallback(() => {
        var container = document.getElementById('aws-cronv')
        var chart = new google.visualization.Timeline(container)
        var dataTable = new google.visualization.DataTable()

        dataTable.addColumn({ type: 'string', id: 'Name' })
        dataTable.addColumn({ type: 'date', id: 'Start' })
        dataTable.addColumn({ type: 'date', id: 'End' })

        dataTable.addRows([${rows}])
        chart.draw(dataTable)
      })
    </script>

    <div id="aws-cronv" style="height: 1800px;"></div>
    `
  }
}
