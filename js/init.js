// Funciones página de inicio

var ejemplares;

// Cambio de ejemplar con efecto css y actualización de datos en la vista
function getEjemplar(num) {
    $('#ejeContent').removeClass('bounceIn').addClass('bounceOut');
    setTimeout(function() {
        var eje = num - 1;
        var imgUrl = 'img/mundo-simi/' + ejemplares[eje].img + '.jpg';
        $('#ejeImg').attr('src', imgUrl);
        $('#ejeTitle').html(ejemplares[eje].titulo);
        $('#ejeDescription').html(ejemplares[eje].subtitulo);
        $('#ejelink').attr('href', ejemplares[eje].url);
        $('#ejeContent').removeClass('bounceOut').addClass('bounceIn');
    }, 800);
}

// Obtiene JSON con los ejemplares Mundo Simi
function getEjeJson() {
    $.getJSON("data/mundoSimi.json", function(data) {
        ejemplares = data.ejemplares;
        $('#ejeLoader').css('display', 'none');
    });
}

function inicioScope() {
    // Inicia plugin de paginación en los ejemplares Mundo Simi
    $('#paginacion').pagination({
        pages: 7,
        prevText: '<',
        nextText: '>',
        displayedPages: 9,
        hrefTextPrefix: '#mundoSimi-',
        onPageClick: function(pageNumber) {
            if (ejemplares) {
                getEjemplar(pageNumber); // Hace el cambio del ejemplar
            }
        }
    });
}

// -------------------------------------------------------------------

// Funciones página ciencia

var actividadesCiencia;

// Cambio de ejemplar con efecto css y actualización de datos en la vista
function getCienciaActividad(num) {
    $('#cienciaCard').removeClass('rotateIn').addClass('rotateOut');
    setTimeout(function() {
        var indice = num - 1;
        var reveal = '<i class="material-icons right">close</i><br>';
        $('#cienciaImage').attr('src', actividadesCiencia[indice].img);
        $('#cienciaTitle').html(actividadesCiencia[indice].titulo);
        $('#cienciaTitleReveal').html(reveal + actividadesCiencia[indice].titulo);
        $('#cienciaDescription').html(actividadesCiencia[indice].descripcion);
        $('#cienciaCard').removeClass('rotateOut').addClass('rotateIn');
    }, 800);
}

// Obtiene JSON con las actividades de Ciencia
function getCienciaJson() {
    $.getJSON("data/actividadesCiencia.json", function(data) {
        actividadesCiencia = data.actividades;
        console.log(actividadesCiencia);
    });
}

function cienciaScope() {
    getCienciaJson();
}

// -------------------------------------------------------------------

(function($) {
    $(function() {
        $('.button-collapse').sideNav({
            edge: 'left',
            closeOnClick: true
        });
        // Inicia plugin para efecto parallax
        $('.parallax').parallax();
        // Opciones para plugin de efecto distort
        var options = {
            effectWeight: 1,
            outerBuffer: 1.05,
            elementDepth: 200,
            perspectiveMulti: 1.0,
            enableSmoothing: true
        };
        // Opciones para plugin particles 
        var particles = {
            dotColor: '#D0FCFF',
            lineColor: '#BFFBFF',
            density: 30000,
            particleRadius: 5,
            proximity: 100,
            parallax: false
        };
        var particleDensity;
        // Utiliza plugin distort
        $('#backFX').logosDistort(options);
        // Utiliza plugin particle
        $('#particle-target').particleground(particles);
        // Quita overlay de sidemenu en versión responsive
        $('.button-collapse').click(function(event) {
            var overlay = $('#sidenav-overlay');
            if (overlay) {
                console.log('Click');
                $('#sidenav-overlay').css('zIndex', '0');
            }
        });
        $('.modal-trigger').leanModal();

        // Obtiene el título de la página
        var titulo = $('title').text();

        // Switch para usar las funciones específicas de cada página
        switch (titulo) {
            case 'Dr Simi | Inicio':
                console.log('Inicio');
                inicioScope();
                break;
            case 'Dr Simi | Ciencia':
                console.log('Ciencia');
                cienciaScope();
                break;
        }

        // Scope Inicio, click con el que se baja la info de los ejemplares Mundo Simi
        $('#ejeTrigger').click(function() {
            if (!ejemplares) {
                $('#ejeLoader').css('display', 'block');
                getEjeJson();
            } else {
                $('#ejeLoader').css('display', 'none');
                console.log('Cargado');
            }
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
