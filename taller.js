/* ============================================================
   Taller de WordPress, SEO y n8n — Lógica Interactiva
   Lee recursos.json, renderiza los módulos Bento, buscador en vivo,
   filtros por tipo, acordeones accesibles y copia rápida de enlaces.
   ============================================================ */

(function () {
  'use strict';

  var FUENTE = 'recursos.json';

  var TIPOS = {
    diapositivas: { label: 'Diapositivas', cta: 'Ver diapositivas', icon: '↗' },
    descarga:     { label: 'Descarga',     cta: 'Descargar archivo', icon: '↓' },
    apuntes:      { label: 'Apuntes',      cta: 'Leer apuntes',     icon: '→' },
    herramienta:  { label: 'Herramienta',  cta: 'Abrir herramienta', icon: '↗' },
    enlace:       { label: 'Enlace',       cta: 'Visitar enlace',   icon: '↗' },
    video:        { label: 'Vídeo',        cta: 'Ver vídeo',        icon: '↗' },
    plantilla:    { label: 'Plantilla',    cta: 'Ver plantilla',   icon: '↗' }
  };

  // SVGs de módulos oficiales
  var ICONOS_MODULO = {
    wordpress: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>',
    seo: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m9 11 2 2 4-4"/></svg>',
    n8n: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/></svg>',
    generic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
  };

  // Elementos DOM
  var $mods = document.getElementById('mods');
  var $buscar = document.getElementById('buscar-recursos');
  var $limpiarBusqueda = document.getElementById('limpiar-busqueda');

  var datosGlobales = null;
  var terminoBusqueda = '';

  // ---------------------------------------------------------- utilidades
  function el(tag, cls, texto) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function esExterno(url) {
    return /^https?:\/\//i.test(url);
  }

  function plural(n, singular, plural_) {
    return n + ' ' + (n === 1 ? singular : plural_);
  }

  function mostrarToast(mensaje) {
    var existente = document.querySelector('.toast-notice');
    if (existente) existente.remove();

    var toast = el('div', 'toast-notice');
    toast.innerHTML = '<span>✓</span> <span>' + mensaje + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(function () { toast.remove(); }, 300);
    }, 2400);
  }

  function copiarAlPortapapeles(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () {
        mostrarToast('Enlace copiado al portapapeles');
      }).catch(function () {
        fallbackCopiar(texto);
      });
    } else {
      fallbackCopiar(texto);
    }
  }

  function fallbackCopiar(texto) {
    var aux = document.createElement('textarea');
    aux.value = texto;
    document.body.appendChild(aux);
    aux.select();
    try {
      document.execCommand('copy');
      mostrarToast('Enlace copiado al portapapeles');
    } catch (e) {
      prompt('Copia este enlace:', texto);
    }
    document.body.removeChild(aux);
  }

  // ---------------------------------------------------------- un recurso
  function pintaRecurso(rec) {
    var li = el('li', 'resource-item');
    var card = el('div', 'resource-card');

    var tipoConfig = TIPOS[rec.tipo] || TIPOS.enlace;
    var tipoClave = TIPOS[rec.tipo] ? rec.tipo : 'enlace';

    // Cabecera de la tarjeta: Badge de tipo + Meta/Formato
    var header = el('div', 'res-header');
    var badge = el('span', 'pill-badge k-' + tipoClave, tipoConfig.label);
    header.appendChild(badge);

    if (rec.meta) {
      var metaSpan = el('span', 'res-meta-format', rec.meta);
      header.appendChild(metaSpan);
    }
    card.appendChild(header);

    // Cuerpo: Título y descripción
    var body = el('div', 'res-body');
    var titleLink = el('a', 'res-title', rec.titulo);
    titleLink.href = rec.url;

    var externo = esExterno(rec.url);
    if (externo) {
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
    }
    if (rec.descarga) {
      titleLink.setAttribute('download', '');
    }
    body.appendChild(titleLink);

    if (rec.descripcion) {
      var desc = el('p', 'res-desc', rec.descripcion);
      body.appendChild(desc);
    }
    card.appendChild(body);

    // Footer: Botón de acción directo + Copiar enlace
    var footer = el('div', 'res-footer');
    var ctaLink = el('a', 'res-cta');
    ctaLink.href = rec.url;
    if (externo) {
      ctaLink.target = '_blank';
      ctaLink.rel = 'noopener noreferrer';
    }
    if (rec.descarga) {
      ctaLink.setAttribute('download', '');
    }

    var flecha = rec.descarga ? '↓' : (externo ? '↗' : '→');
    var ctaTexto = rec.descarga ? 'Descargar' : (externo ? 'Abrir herramienta' : 'Ver recurso');
    if (rec.tipo === 'diapositivas') ctaTexto = 'Abrir diapositivas';
    if (rec.tipo === 'apuntes') ctaTexto = 'Leer apuntes';

    ctaLink.innerHTML = '<span>' + ctaTexto + '</span> <span aria-hidden="true">' + flecha + '</span>';
    footer.appendChild(ctaLink);

    // Botón de copiar enlace
    var copyBtn = el('button', 'res-copy-btn');
    copyBtn.type = 'button';
    copyBtn.title = 'Copiar enlace al portapapeles';
    copyBtn.setAttribute('aria-label', 'Copiar enlace de ' + rec.titulo);
    copyBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
    copyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var absoluteUrl = new URL(rec.url, window.location.href).href;
      copiarAlPortapapeles(absoluteUrl);
    });
    footer.appendChild(copyBtn);

    card.appendChild(footer);
    li.appendChild(card);
    return li;
  }

  // ---------------------------------------------------------- un módulo
  function pintaSeccion(sec, indice, recursosFiltrados) {
    var recursos = recursosFiltrados !== undefined ? recursosFiltrados : (sec.recursos || []);

    var mod = el('section', 'mod-block');
    mod.id = sec.id;

    var idPanel = 'panel-' + sec.id;
    var idTitulo = 'titulo-' + sec.id;

    var head = el('button', 'mod-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.setAttribute('aria-controls', idPanel);

    // Identidad (Número + Icono temático Talkbase)
    var identity = el('div', 'mod-identity');
    var numBadge = el('span', 'mod-num-badge', sec.numero || ('0' + (indice + 1)));
    identity.appendChild(numBadge);

    var iconClass = 'mod-icon-' + (sec.id.toLowerCase() || 'generic');
    var iconBox = el('div', 'mod-icon-box ' + iconClass);
    iconBox.innerHTML = ICONOS_MODULO[sec.id.toLowerCase()] || ICONOS_MODULO.generic;
    identity.appendChild(iconBox);

    head.appendChild(identity);

    // Textos del módulo
    var txt = el('div', 'mod-meta-info');
    var nombre = el('h2', 'mod-title', sec.nombre);
    nombre.id = idTitulo;
    txt.appendChild(nombre);
    if (sec.descripcion) {
      txt.appendChild(el('span', 'mod-desc', sec.descripcion));
    }
    head.appendChild(txt);

    // Conteo de recursos
    var countPill = el('span', 'mod-count-pill', plural(recursos.length, 'recurso', 'recursos'));
    head.appendChild(countPill);

    // Chevron interactivo
    var chev = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chev.setAttribute('class', 'mod-chev');
    chev.setAttribute('viewBox', '0 0 24 24');
    chev.setAttribute('fill', 'none');
    chev.setAttribute('stroke', 'currentColor');
    chev.setAttribute('stroke-width', '2.2');
    chev.setAttribute('stroke-linecap', 'round');
    chev.setAttribute('stroke-linejoin', 'round');
    chev.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'm6 9 6 6 6-6');
    chev.appendChild(path);
    head.appendChild(chev);

    // Panel desplegable
    var panel = el('div', 'mod-panel');
    panel.id = idPanel;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', idTitulo);

    var inner = el('div', 'panel-content');
    if (recursos.length) {
      var ul = el('ul', 'resources-grid');
      recursos.forEach(function (rec) {
        ul.appendChild(pintaRecurso(rec));
      });
      inner.appendChild(ul);
    } else {
      inner.appendChild(el('p', 'res-empty-msg',
        'No hay recursos que coincidan con el filtro en este módulo.'));
    }
    panel.appendChild(inner);

    mod.appendChild(head);
    mod.appendChild(panel);

    head.addEventListener('click', function () {
      abre(mod, !mod.hasAttribute('data-open'), true);
    });

    return mod;
  }

  // ---------------------------------------------------------- abrir / cerrar
  function abre(mod, abierto, marcaEnUrl) {
    if (!mod) return;
    var head = mod.querySelector('.mod-head');
    var panel = mod.querySelector('.mod-panel');

    if (abierto) {
      mod.setAttribute('data-open', '');
      if (head) head.setAttribute('aria-expanded', 'true');
      if (panel) panel.removeAttribute('inert');
      if (marcaEnUrl && history.replaceState) {
        history.replaceState(null, '', '#' + mod.id);
      }
    } else {
      mod.removeAttribute('data-open');
      if (head) head.setAttribute('aria-expanded', 'false');
      if (panel) panel.setAttribute('inert', '');
      if (marcaEnUrl && history.replaceState && location.hash === '#' + mod.id) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
  }

  function todos(abierto) {
    Array.prototype.forEach.call($mods.querySelectorAll('.mod-block'), function (m) {
      abre(m, abierto, false);
    });
  }

  // ---------------------------------------------------------- filtrado y búsqueda
  function aplicarFiltros() {
    if (!datosGlobales) return;
    var secciones = datosGlobales.secciones || [];
    var query = terminoBusqueda.trim().toLowerCase();

    $mods.innerHTML = '';
    var totalCoincidencias = 0;

    secciones.forEach(function (sec, i) {
      var recursosOriginales = sec.recursos || [];
      var filtrados = recursosOriginales.filter(function (rec) {
        if (query) {
          var enTitulo = (rec.titulo || '').toLowerCase().indexOf(query) !== -1;
          var enDesc = (rec.descripcion || '').toLowerCase().indexOf(query) !== -1;
          var enTipo = (rec.tipo || '').toLowerCase().indexOf(query) !== -1;
          var enMeta = (rec.meta || '').toLowerCase().indexOf(query) !== -1;
          var enModulo = (sec.nombre || '').toLowerCase().indexOf(query) !== -1;
          return enTitulo || enDesc || enTipo || enMeta || enModulo;
        }
        return true;
      });

      totalCoincidencias += filtrados.length;

      if (!query) {
        var modEl = pintaSeccion(sec, i, filtrados);
        $mods.appendChild(modEl);
      } else if (filtrados.length > 0) {
        var modElFiltrado = pintaSeccion(sec, i, filtrados);
        $mods.appendChild(modElFiltrado);
        abre(modElFiltrado, true, false);
      }
    });

    if (query && totalCoincidencias === 0) {
      var emptyBox = el('div', 'loading-state');
      emptyBox.innerHTML = '<p style="font-size:1.1rem;font-weight:600;color:var(--text-main);">No se encontraron recursos</p><p style="color:var(--text-muted);">Prueba con otros términos como "Rank Math", "PPTX", "SEO".</p>';
      $mods.appendChild(emptyBox);
    }
  }

  // ---------------------------------------------------------- pintar inicial
  function pinta(datos) {
    datosGlobales = datos;
    var secciones = datos.secciones || [];

    if (datos.taller) {
      document.title = datos.taller + ' — Material del Máster';
      var $titulo = document.getElementById('titulo');
      if ($titulo) $titulo.textContent = datos.taller;
    }
    if (datos.subtitulo) {
      var $subtitulo = document.getElementById('subtitulo');
      if ($subtitulo) $subtitulo.textContent = datos.subtitulo;
    }

    var total = secciones.reduce(function (n, s) {
      return n + ((s.recursos && s.recursos.length) || 0);
    }, 0);

    var $total = document.getElementById('total');
    if ($total) $total.textContent = plural(total, 'recurso', 'recursos');

    var $nModulos = document.getElementById('n-modulos');
    if ($nModulos) $nModulos.textContent = plural(secciones.length, 'módulo', 'módulos');

    var $actualizado = document.getElementById('actualizado');
    if ($actualizado && datos.actualizado) {
      $actualizado.textContent = datos.actualizado;
    }

    $mods.innerHTML = '';
    secciones.forEach(function (sec, i) {
      $mods.appendChild(pintaSeccion(sec, i));
    });

    // Estado inicial: todas las categorías colapsadas por defecto
    todos(false);
    var destino = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (destino && destino.classList.contains('mod-block')) {
      abre(destino, true, false);
      setTimeout(function () {
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    var $acciones = document.getElementById('acciones');
    if ($acciones) $acciones.hidden = false;

    // Configurar escuchas de eventos
    configurarEventos();
  }

  function configurarEventos() {
    var $abrirTodo = document.getElementById('abrir-todo');
    var $cerrarTodo = document.getElementById('cerrar-todo');

    if ($abrirTodo) {
      $abrirTodo.onclick = function () { todos(true); };
    }
    if ($cerrarTodo) {
      $cerrarTodo.onclick = function () { todos(false); };
    }

    // Buscador en vivo
    if ($buscar) {
      $buscar.addEventListener('input', function (e) {
        terminoBusqueda = e.target.value;
        $limpiarBusqueda.hidden = !terminoBusqueda;
        aplicarFiltros();
      });
    }

    if ($limpiarBusqueda) {
      $limpiarBusqueda.addEventListener('click', function () {
        $buscar.value = '';
        terminoBusqueda = '';
        $limpiarBusqueda.hidden = true;
        aplicarFiltros();
        $buscar.focus();
      });
    }


    // Atajo de teclado: Tecla '/' para enfocar el buscador
    window.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== $buscar && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if ($buscar) {
          $buscar.focus();
          $buscar.select();
        }
      }
    });

    // Control de estado sticky del buscador
    inicializarStickyControls();
  }

  // ---------------------------------------------------------- detector sticky
  function inicializarStickyControls() {
    var $controlsBar = document.querySelector('.controls-bar');
    var $sentinel = document.querySelector('.sticky-sentinel');
    if (!$controlsBar || !$sentinel) return;

    function actualizarSticky() {
      var topbarH = window.innerWidth <= 768 ? 54 : 58;
      var rect = $sentinel.getBoundingClientRect();
      $controlsBar.classList.toggle('is-stuck', rect.top <= topbarH);
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function () {
        actualizarSticky();
      }, {
        rootMargin: '-54px 0px 0px 0px',
        threshold: [0, 1]
      });
      obs.observe($sentinel);
    }

    window.addEventListener('scroll', actualizarSticky, { passive: true });
    window.addEventListener('resize', actualizarSticky, { passive: true });
    actualizarSticky();
  }

  // ---------------------------------------------------------- carga
  function falloDeCarga(motivo) {
    $mods.innerHTML = '<div class="loading-state"><p style="color:var(--text-muted);">' + motivo + '</p></div>';
  }

  fetch(FUENTE, { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('El servidor respondió con estado ' + r.status);
      return r.json();
    })
    .then(pinta)
    .catch(function (err) {
      if (location.protocol === 'file:') {
        falloDeCarga('La página se ha abierto directamente con doble clic en el archivo (file://). Por seguridad, los navegadores bloquean la lectura de archivos JSON locales desde JavaScript.');
      } else {
        falloDeCarga('No se ha podido leer recursos.json: ' + err.message);
      }
    });
})();
