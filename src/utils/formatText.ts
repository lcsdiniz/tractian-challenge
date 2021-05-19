export function formatsMetric(metric: string) {
  let formattedMetric = '';
  switch (metric) {
    case ('totalCollectsUptime'):
      formattedMetric = 'Total Collects Uptime';
      break;
    case ('totalUptime'):
      formattedMetric = 'Total Uptime';
      break;
    case ('lastUptimeAt'):
      formattedMetric = 'Last Uptime At';
      break;
    default:
      formattedMetric = metric;
      break;
  }

  return formattedMetric;
};

export function formatsSpecification(specification: string) {
  let formattedSpecification = '';
  switch (specification) {
    case ('rpm'):
      formattedSpecification = 'RPM';
      break;
    case ('maxTemp'):
      formattedSpecification = 'Max Temperature';
      break;
    case ('power'):
      formattedSpecification = 'Power';
      break;
    default:
      formattedSpecification = specification;
      break;
  }

  return formattedSpecification;
}