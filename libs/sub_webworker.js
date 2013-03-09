﻿// sub-webworker that works up a start, end-epsilon step

importScripts('optics.js','help_methods.js');

onmessage = function(event){
  
  var data = event.data;
  
  var clusteringAlgo = new OPTICS(data.dataset);
  var results = [];
  
  var step = data.max_epsilon/100;
  
  for(var epsilon=data.start; epsilon < data.end; epsilon += step){
  
    for(var minPts=4; minPts < 11; minPts++){
      
      var result = clusteringAlgo.start(epsilon, minPts);
      
      var ratio_not_undefined_elements_to_undefined_elements = getRatioNotUndefinedToUndefined(result);
      var ratio_density = getRatioClusterDensityAverage(result); // calulate density of each cluster and calculate average of all cluster-densities
      
      results.push({ e: epsilon, minPts: minPts, ratio_undefined: ratio_not_undefined_elements_to_undefined_elements, ratio_density: ratio_density })
    }
    
  }
  
  var best_result = getBestResultByHighestRatios(results); // compare results and return result that has got hightest ratios
  
  postMessage(best_result);
};