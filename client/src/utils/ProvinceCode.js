export const provinceCode = (province) => {
  let code;
  code =
    province === 'Ontario'
      ? 'ON'
      : province === 'Quebec'
      ? 'QC'
      : province === 'New Brunswick'
      ? 'NB'
      : province === 'Manitoba'
      ? 'MB'
      : province === 'British Columbia'
      ? 'BC'
      : province === 'Prince Edward Island'
      ? 'PE'
      : province === 'Nova Scotia'
      ? 'NS'
      : province === 'Saskatchewan'
      ? 'SK'
      : province === 'Alberta'
      ? 'AB'
      : province === 'Newfoundland and Labrador'
      ? 'NL'
      : province === 'Northwest Territories'
      ? 'NT'
      : province === 'Yukon'
      ? 'YT'
      : province === 'Nunavut'
      ? 'NU'
      : null;
  return code;
};
