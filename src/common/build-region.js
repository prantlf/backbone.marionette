import _ from 'underscore';
import MarionetteError from '../error';
import Region from '../region';

// return the region instance from the definition
export default function(definition, defaults) {
  if (definition instanceof Region) {
    return definition;
  }

  return buildRegionFromDefinition(definition, defaults);
}

function buildRegionFromDefinition(definition, defaults) {
  const opts = _.extend({}, defaults);

  if (_.isString(definition)) {
    opts.el = definition;

    return buildRegionFromObject(opts);
  }

  if (_.isFunction(definition)) {
    opts.regionClass = definition;

    return buildRegionFromObject(opts);
  }

  if (_.isObject(definition)) {
    _.extend(opts, definition);

    return buildRegionFromObject(opts);
  }

  throw new MarionetteError({
    message: 'Improper region configuration type.',
    url: 'marionette.region.html#region-configuration-types'
  });
}

function buildRegionFromObject(definition) {
  const RegionClass = definition.regionClass

  const options = _.omit(definition, 'regionClass');

  return new RegionClass(options);
}
