require.config({
    paths: {
        selfish: '../lib/selfish/selfish'
    }
});

require(['GravityView', 'GravityModel', 'Controls', 'MouseArea'],
    function(GravityView, GravityModel, Controls, MouseArea) {
    loaded = function()
    {
        gravityView = GravityView.new('gravity', 'view1'); // Global
        gravityView.show();

        gravityModel = GravityModel.new(gravityView); // Global

        controls = Controls.new('gravity', gravityView, gravityModel);;
        controls.show();
    }



    loaded();
});



