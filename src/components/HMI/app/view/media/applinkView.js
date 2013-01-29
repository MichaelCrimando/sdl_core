/**
 * @name MFT.applinkView
 * 
 * @desc Applink Media application module visual representation
 * 
 * @category	View
 * @filesource	app/view/media/applinkView.js
 * @version		2.0
 *
 * @author		Melnik Andriy
 */
MFT.applinkView = Em.ContainerView.create(MFT.LoadableView,{
	
	/**
	 * View Id
	 */	
	elementId: 'applink_view_container',

	/**
	 * View Components
	 */
	childViews: [
		'innerMenu',
		'controlls'
	],
	
	controlls: MFT.ApplinkMediaControllsV1,

	/**
	 * Function to choose appropriate view
	 * to current version of protocol
	 */
	changeControlls: function(){
		if(MFT.ApplinkController.protocolVersion2State){
			this.get('childViews').removeObjects(
                this.get('childViews').filterProperty( 'applinkMediaControlls' , 'V1' )
            );
			MFT.applinkView.get('childViews').pushObject(MFT.ApplinkMediaControllsV2);
		}else{
			this.get('childViews').removeObjects(
                this.get('childViews').filterProperty( 'applinkMediaControlls' , 'V2' )
            );
			MFT.applinkView.get('childViews').pushObject(MFT.ApplinkMediaControllsV1);
		}
	}.observes('MFT.ApplinkController.protocolVersion2State'),

    /*
     * Sends notification to model with name of destination view
     */
    deactivateApplication: function(){
     	if( !MFT.States.media.applink.active ){
     		MFT.ApplinkModel.onDeactivateApp( MFT.TransitionIterator.finalPath, MFT.ApplinkAppController.model.appId, MFT.ApplinkAppController.model.appName );
     	}
    }.observes('MFT.States.media.applink.active'),

	innerMenu: MFT.MenuList.extend({

		content: Em.ContainerView.extend({

			classNames: ['content'],

			attributeBindings: ['parentView.contentPositon:style'],
			
			childViews: [
				'softButtons'
			],

		    AddSoftButton: function( params ){

		    	this.deleteItems();

		    	if(params){
					for(var i=0; i < params.length; i++){
						this.get('childViews').pushObject(
							MFT.Button.create({
								actionDown:		function(){
									this._super();
									FFW.Buttons.buttonEventCustom( "CUSTOM_BUTTON", "BUTTONDOWN", this.softButtonID);
									var self = this;
									this.time = 0;
									setTimeout(function(){ self.time ++; }, 1000);
								},
								actionUp:		function(){
									this._super();
									FFW.Buttons.buttonEventCustom( "CUSTOM_BUTTON", "BUTTONUP", this.softButtonID);
									if(this.time > 0){
										FFW.Buttons.buttonPressedCustom( "CUSTOM_BUTTON", "LONG", this.softButtonID);
									}else{
										FFW.Buttons.buttonPressedCustom( "CUSTOM_BUTTON", "SHORT", this.softButtonID);
									}
									this.time = 0;
								},
								softButtonID:           params[i].softButtonID,
				                //appId:                  appId,
				                icon:                   params[i].image,
				                text:                   params[i].text,
				                classNames:             'list-item',
				                templateName:           params[i].image ? 'rightIcon' : 'text'
				            })
				        );
				    }
				}
		    },

		    /**
			 * Delete items from container
			 * 
			 */
			deleteItems: function() {
				var i,
					count = this.get('childViews').length;
				for( i=0; i < count; i++){
					this.get('childViews').popObject();
				}
				this.get('childViews').pushObject(
					MFT.Button.create({
						text: 'Options',
						
						templateName: 'arrow',
						
						action:		'openCommandsList',
						target:		'MFT.ApplinkAppController'
					})
				);
			},

			softButtons: MFT.Button.extend({
				text: 'Options',
				
				templateName: 'arrow',
				
				action:		'openCommandsList',
				target:		'MFT.ApplinkAppController'
			})
		})
	}),

	/** Calls Applink SystemContext switcher when turn On/Of Applink application */
	/*onTurnOnApplinkApp: function(systemContextValue){
		if(MFT.States.media.applink.active){
            MFT.ApplinkMediaController.onSystemContextSwitcher(MFT.ApplinkMediaController.eSystemContext.application);
		}else{
            MFT.ApplinkMediaController.onSystemContextSwitcher(MFT.ApplinkMediaController.eSystemContext.main);
		}
	}.observes('MFT.States.media.applink.active')*/
});