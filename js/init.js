var ejemplares;

function getEjemplar(num) {
	$('#ejeContent').removeClass('bounceIn').addClass('bounceOut');
	setTimeout(function(){
		var eje = num - 1;
		var imgUrl = 'img/mundo-simi/' + ejemplares[eje].img + '.jpg';
		$('#ejeImg').attr('src', imgUrl);
		$('#ejeTitle').html(ejemplares[eje].titulo);
		$('#ejeDescription').html(ejemplares[eje].subtitulo);
		$('#ejelink').attr('href', ejemplares[eje].url);		
		$('#ejeContent').removeClass('bounceOut').addClass('bounceIn');
	}, 800);
}

(function($) {
    $(function() {
        $('.button-collapse').sideNav({
            edge: 'left',
            closeOnClick: true
        });
        $('.parallax').parallax();
        var options = {
            effectWeight: 1,
            outerBuffer: 1.05,
            elementDepth: 200,
            perspectiveMulti: 1.0,
            enableSmoothing: true
        };
        var particles = {
            dotColor: '#D0FCFF',
            lineColor: '#BFFBFF',
            density: 30000,
            particleRadius: 5,
            proximity: 100,
            parallax: false
        };
        var particleDensity;
        $('#backFX').logosDistort(options);
        $('#particle-target').particleground(particles);
        $('.button-collapse').click(function(event) {
            var overlay = $('#sidenav-overlay');
            if (overlay) {
                console.log('Click');
                $('#sidenav-overlay').css('zIndex', '0');
            }
        });
        $('.modal-trigger').leanModal();

        $('#paginacion').pagination({
            pages: 7,
            prevText: '<',
            nextText: '>',
            displayedPages: 9,
            hrefTextPrefix: '#mundoSimi-',
            onPageClick: function(pageNumber) {
            	if(ejemplares) {
            		getEjemplar(pageNumber);
            	}                
            }
        });

        $('#ejeTrigger').click(function() {        	
        	if(!ejemplares) {
        		$('#ejeLoader').css('display', 'block');
        		getEjeJson();
        	} else {
        		$('#ejeLoader').css('display', 'none');
        		console.log('Cargado');
        	}
        });

        function getEjeJson() {
	        $.getJSON("data/mundoSimi.json", function(data) {
	        	ejemplares = data.ejemplares;
	        	$('#ejeLoader').css('display', 'none');
	        });        	
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space
