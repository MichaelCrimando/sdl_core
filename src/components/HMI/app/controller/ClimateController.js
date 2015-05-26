SDL.ClimateController = Em.Object.create({

	modelBinding: "SDL.ClimateControlModel",

	climateUp: function() {
		this.model.increaseSpeed();
		FFW.RC.onInteriorVehicleDataNotification("CLIMATE");
	},

	climateDown: function() {
		this.model.decreaseSpeed();
		FFW.RC.onInteriorVehicleDataNotification("CLIMATE");
	},
	setClimate: function(request){
		Em.Logger.log("Climate controller set climate: " + JSON.stringify(request));
		this.model.setSpeed(request.params.moduleData.climateControlData.fanSpeed);
		//FFW.RC.onInteriorVehicleDataNotification("CLIMATE");
		return(this.model.currentFanSpeed);
	},
	tempUp: function() {
		this.model.increaseTemp();
		FFW.RC.onInteriorVehicleDataNotification("CLIMATE");
	},
	tempDown: function() {
		this.model.decreaseTemp();
		FFW.RC.onInteriorVehicleDataNotification("CLIMATE");
	},
	setTemp: function(request){
		Em.Logger.log("Climate controller set temperature: " + JSON.stringify(request));
		this.model.setTemp(request.params.moduleData.climateControlData.desiredTemp);
		return(this.model.desiredTemp);
	},
	setAcEnable: function(request){
		this.model.setAcEnable(request.params.moduleData.climateControlData.acEnable);
		return(this.model.acEnable);
	},
	setRecirculateAirEnable: function(request){
		this.model.setRecirculateAirEnable(request.params.moduleData.climateControlData.recirculateAirEnable);
		return(this.model.recirculateAirEnable);	
	},
	setAutoModeEnable: function(request){
		this.model.setAutoModeEnable(request.params.moduleData.climateControlData.autoModeEnable);
		return(this.model.autoModeEnable);
	},
	setDefrostZone: function(request){
		this.model.setDefrostZone(request.params.moduleData.climateControlData.defrostZone);
		return(this.model.defrostZone);
	},
	setDualModeEnable: function(request){
		this.model.setDualModeEnable(request.params.moduleData.climateControlData.dualModeEnable);
		return(this.model.dualModeEnable);
	},
	toggleAutoMode: function(){
		Em.Logger.log("toggleautomode controller");
		this.model.toggleAutoMode;
		return(this.model.autoModeEnable);
	}

});