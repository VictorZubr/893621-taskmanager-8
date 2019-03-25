import Statistics from "./statistics";
import moment from 'moment';
import {COLORS_HEXADECIMAL} from './get-task';

const maxStatisticLabels = Object.keys(COLORS_HEXADECIMAL).length;

const getChartDataObject = (data, title) => ({
  name: title,
  data: {
    labels: data.map((element) => `#${element[0]}`),
    datasets: [{
      data: data.map((element) => element[1]),
      backgroundColor: data.map((element, index) => COLORS_HEXADECIMAL[element[0]] || Object.values(COLORS_HEXADECIMAL)[index])
    }]
  }
});

const clipSortedItems = (arr, count) => {
  const obj = arr.reduce((acc, it) => {
    acc[it] = isNaN(acc[it]) ? 1 : ++acc[it];
    return acc;
  }, {});
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, count);
};

const getStatisticData = (tasks, dateBegin, dateEnd) => {
  const filteredTasks = tasks.filter((element) => element.dueDate >= dateBegin && element.dueDate <= dateEnd);

  const [tags, colors] = filteredTasks
    .reduce((acc, task) => {
      acc[0].push(...task.tags);
      acc[1].push(task.color);
      return acc;
    }, [[], []]);

  return [
    filteredTasks.length,
    getChartDataObject(clipSortedItems(tags, maxStatisticLabels), `tags`),
    getChartDataObject(clipSortedItems(colors, maxStatisticLabels), `colors`)
  ];
};

export default (tasks, container) => {
  const statisticData = {
    dateBegin: +moment().startOf(`week`),
    dateEnd: +moment().endOf(`week`),
  };
  [statisticData.count, statisticData.tags, statisticData.colors] = getStatisticData(tasks, statisticData.dateBegin, statisticData.dateEnd);

  const statistics = new Statistics(statisticData);

  statistics.onPeriodChange = (dateBegin, dateEnd) => {
    statisticData.dateBegin = dateBegin;
    statisticData.dateEnd = dateEnd;
    [statisticData.count, statisticData.tags, statisticData.colors] = getStatisticData(tasks, statisticData.dateBegin, statisticData.dateEnd);
    statistics.update(statisticData);
  };

  container.appendChild(statistics.render());
};
