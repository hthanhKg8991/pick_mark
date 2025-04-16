export function isEmpty(variable: string | undefined | null) {
  return variable === null || undefined === variable || variable === '';
}

export function stringInterpolate(
  theString: string,
  argumentArray: Array<any>,
) {
  const regex = /%s/;
  const _r = function (p: any, c: any) {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
}
