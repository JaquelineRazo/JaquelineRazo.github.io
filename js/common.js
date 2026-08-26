jQuery(function ($) {

	// Respect prefers-reduced-motion: reuse the theme's existing
	// "disable-cursor" body class (already the mechanism isMobile()
	// uses to turn off the custom cursor on touch devices — see
	// window.Core below and style.css:1452 for #magic-cursor) so
	// reduced-motion users never get the mouse-follow cursor animation
	// in the first place, rather than trying to gate every individual
	// GSAP tween across this file.
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		$('body').addClass('disable-cursor');
	}

/*--------------------------------------------------
Function Scroll Effects
---------------------------------------------------*/


	window.ScrollEffects = function() {
		
		gsap.defaults({overwrite: "auto"});	
		gsap.registerPlugin(ScrollTrigger, Flip);
		gsap.config({nullTargetWarn: false});
		
		const sliders = [
			'.showcase-gallery',
			'.showcase-lists'
		];

		const body = $('body');
		let hasSlider = false;

		sliders.forEach(slider => {
			if ($(slider).length > 0) {
				hasSlider = true;
				return false; // Exit the loop early if a slider is found
			}
		});

		if (hasSlider) {			
			body.addClass('has-slider');
		} else {			
			body.removeClass('has-slider');
		}
		
		setTimeout(function(){
			var threeapp = document.getElementById("app");
			threeapp.className += "active"; 
			$("body").append(threeapp)
		} , 1500 );
		
		if( $('#showcase-slider').length > 0 ){
			setTimeout(function(){
				var threeSlider = document.getElementById("canvas-slider");
				threeSlider.className += " active"; 
				$("body").append(threeSlider)
			} , 1500 );
		}
		
		if (!$("body").hasClass("project-nav-text")) {
			if( $('#project-nav').length > 0 ){
				$('#main-content').addClass('solid-color');
				$('#main-page-content').addClass('project-page');					
			}
		}
		
		if( $('.portfolio').length > 0 ){			
			$('#main-content').addClass('portfolio-page');				
		}
		
			
		
		
		let enableSmoothScrollMobile = true;
		if( isMobile() ){
			
			if( !enableSmoothScrollMobile ){
				
				document.body.classList.remove("smooth-scroll");
			}
		}
		
		if (document.body.classList.contains("smooth-scroll"))  {
			
			const ScrollArea = document.querySelector('#content-scroll');
			class EdgeEasingPlugin extends Scrollbar.ScrollbarPlugin {
				constructor() {
					super(...arguments);
					this._remainMomentum = {
						x: 0,
						y: 0,
					};
				}
				transformDelta(delta) {
					const { limit, offset, } = this.scrollbar;
					const x = this._remainMomentum.x + delta.x;
					const y = this._remainMomentum.y + delta.y;
					// clamps momentum within [-offset, limit - offset]
					this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
					return { x: 0, y: 0 };
				}
				onRender(remainMomentum) {
					Object.assign(this._remainMomentum, remainMomentum);
				}
			}
			
			EdgeEasingPlugin.pluginName = 'edgeEasing';
			Scrollbar.use(EdgeEasingPlugin);
			
			// Config
			
			
			if (!isMobile()) {
				
				var ScrollbarOptions = {
					damping:0.1,
					renderByPixel: true,
					continuousScrolling: true,
					syncCallbacks: true,
				};				
			}
			
			if (isMobile()) {
			
				var ScrollbarOptions = {
					damping:0.2,
					renderByPixel: true,
					continuousScrolling: true,
					syncCallbacks: true,
				};
			}

			// Initialise
			var scrollbar = Scrollbar.init(ScrollArea, /*ScrollbarOptions*/);			
			
			
			ScrollTrigger.scrollerProxy("#content-scroll", {
				scrollTop(value) {
					if (arguments.length) { scrollbar.scrollTop = value; }
					return scrollbar.scrollTop;
			  	}
			});	
					
			scrollbar.addListener(ScrollTrigger.update);			
			ScrollTrigger.defaults({ scroller: ScrollArea });
			
			
		}// End Smooth Scroll
		
		
		
		if (isMobile()) {
				
			var heroTranslate = $('.hero-translate').height();	
			var winHeight = $(window).height();
			var footer_height = $('footer').height();						
			$('.smooth-scroll main, .has-parallax, nav, .clapat-slider-wrapper:not(.content-slider), .showcase-lists .clapat-sync-slider, .next-project-image-wrapper, .slider-fixed-content').css({'height': winHeight});
			$('#main-page-content.project-page').css({'margin-bottom': winHeight*2 - footer_height});
			if (!$("body").hasClass("project-nav-text")) {
				$('#project-nav').css({'height': winHeight*2, 'bottom': -winHeight*2});
			}			
			$(".icon-wrap").removeClass("parallax-wrap");
			
			
			var resizeTime;
			$(window).resize(function() {
				clearTimeout(resizeTime);
				resizeTime = setTimeout(doneResizing, 100);
			});
			
			function doneResizing(){
				var heroTranslate = $('.hero-translate').height();
				var winHeight = $(window).height();	
				var footer_height = $('footer').height();					
				$('.smooth-scroll main, .has-parallax, nav, .clapat-slider-wrapper:not(.content-slider), .showcase-lists .clapat-sync-slider, .next-project-image-wrapper, .slider-fixed-content').css({'height': winHeight});							
				$('#main-page-content.project-page').css({'margin-bottom': winHeight*2 - footer_height});
				if (!$("body").hasClass("project-nav-text")) {
					$('#project-nav').css({'height': winHeight*2, 'bottom': -winHeight*2});
				}
				$(".icon-wrap").removeClass("parallax-wrap");			
			}
		} 
		
		
		// Hero AutoScroll On Page Load
		let autoScroll = null;

		if ($('body').hasClass("load-project-thumb") || $('body').hasClass("load-project-thumb-with-title")) {
			const delayTime = $('body').hasClass("load-project-thumb-with-title") ? 0.6 : 1.2;
			
			if ($('#hero.has-image').hasClass('autoscroll')) {		
				if ($("body").hasClass("smooth-scroll")) {
					scrollbar.scrollTop = 0; // Reset the scrollbar position to 0
					autoScroll = gsap.to(scrollbar, {duration: 0.7, scrollTop:120, delay:delayTime, ease:Power2.easeInOut});
				} else {                    
					autoScroll = gsap.to(window, {duration: 0.7, scrollTo:120, delay:delayTime, ease:Power2.easeInOut});           
				}	
			}
		}
		
		// Slider Center on click
		$('.autocenter').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);
				autoScroll = gsap.to(scrollbar, {duration: 0.8, scrollTop:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		// Add an event listener for the mousewheel event
		window.addEventListener('wheel', function(event) {
			if (autoScroll !== null) {
			// Kill the scroll trigger animation
				autoScroll.kill();
				autoScroll = null;
			}
		});
		
		

		if ($('body').hasClass("swap-logo")) {
		
			var imgLogoWhite = document.querySelector('.white-logo');
			var originalSrcWhite = 'images/logo-white.png';
			var updatedSrcWhite = 'images/logo-white-symbol.png';
			
			var imgLogoBlack = document.querySelector('.black-logo');
			var originalSrcBlack = 'images/logo.png';
			var updatedSrcBlack = 'images/logo-symbol.png';
			
			// Create a scroll trigger
			
			ScrollTrigger.create({
				trigger: 'header', // Set the trigger element
				start: 'top 120px',
				onEnter: function() {
					//Restore the original image source			
					imgLogoWhite.src = originalSrcWhite;
					imgLogoBlack.src = originalSrcBlack;
					gsap.to($("#logo"), {duration: 0.2, opacity:1});
				},
				onEnterBack: function() {
					// Restore the original image source
					gsap.to($("#logo"), {duration: 0.2, opacity:0, onComplete: function() {
						imgLogoWhite.src = originalSrcWhite;
						imgLogoBlack.src = originalSrcBlack;
						gsap.to($("#logo"), {duration: 0.2, opacity:1});
					}});
					
					$('header').removeClass('swapped-logo');
				},
				onLeave: function() {
					// Change the image source
					gsap.to($("#logo"), {duration: 0.2, opacity:0, onComplete: function() {
						imgLogoWhite.src = updatedSrcWhite;
						imgLogoBlack.src = updatedSrcBlack;
						gsap.to($("#logo"), {duration: 0.2, opacity:1});
					}});
					
					$('header').addClass('swapped-logo');			
				},
				onLeaveBack: function() {
					// Change the image source
					gsap.to($("#logo"), {duration: 0.2, opacity:0, onComplete: function() {
						imgLogoWhite.src = updatedSrcWhite;
						imgLogoBlack.src = updatedSrcBlack;
						gsap.to($("#logo"), {duration: 0.2, opacity:1});
					}});
					
					$('header').addClass('swapped-logo');
				}
			});
			
			$('a.ajax-link, a.slide-link, a.next-ajax-link-page').on('click', function() {
				// Restore the original image source when you leave the page
				if ($("header").hasClass("swapped-logo")) {
				
					gsap.to($("#logo"), {duration: 0.2, opacity:0, onComplete: function() {
						imgLogoWhite.src = originalSrcWhite;
						imgLogoBlack.src = originalSrcBlack;
						gsap.to($("#logo"), {duration: 0.2, opacity:1});
					}});
				
				}
			});
			
		}
		
		
		// Back To Top
		$('#backtotop').on('click', function() {	
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, {duration: 1.5, scrollTop:0, delay:0.1, ease:Power4.easeInOut});
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
				gsap.to('#ball', {duration: 0.3,  borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});
		
		
		//Scroll Down
		$('.scroll-down, .hero-arrow.link').on('click', function() {	
			var heroheight = $("#hero").height();			
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, {duration: 1.5, scrollTop:heroheight, ease:Power4.easeInOut});
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: heroheight}, 800);
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});
		
		
		
		// Hero Section Effects
		if ($('#hero').hasClass('has-image')) {				
			
			const heroCaption = document.querySelector('#hero.has-image #hero-caption');
			const heroImage = document.querySelector('#hero-image-wrapper');
			
			function setheroImageProperties() {								
				gsap.set(heroCaption, { height: window.innerHeight});
				gsap.set(heroImage, { height: window.innerHeight });
			}		
				
			setheroImageProperties();
							
			var heroImagePin = gsap.to('#hero-image-wrapper', {
				scrollTrigger: {
					trigger: $("#hero.has-image"),
					start: "top top",						
					end: function() {
						const durationHeight = $('#hero.has-image').outerHeight();
						return "+=" + durationHeight;
					},
					pin: '#hero-background-layer',
				}
			});
			
			window.addEventListener('resize', setheroImageProperties);		
		
	
			var heroImageParallax = gsap.to('.parallax-scroll-image #hero-bg-image', {
				duration: 1, 
				backgroundPosition: "center " + 95 +"%", 
				ease:Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero',
					start: "top top",
					end: () => `+=${$('#hero').outerHeight()}`,
					scrub: true,
				}
			});
			
			var heroFooterParallax = gsap.to('#hero-footer', {
				duration: 1, 
				opacity:0, 
				ease:Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero-description',
					start: "top 0%",
					end: function() {
						var durationHeight = $('#hero-description').outerHeight() * 3;
						return "+=" + durationHeight;
					},
					scrub: true,
				}
			});
			
			const heroCaptionInner = document.querySelector("#hero-caption .inner");
			
			
			const state = Flip.getState(heroCaptionInner);
			heroCaption.classList.add("align-start");
			
			const flip = Flip.from(state, {
				duration: 1,	
				ease: "power1.inOut",
			});
			
			gsap.to(heroCaptionInner, {				  
			  scrollTrigger: {
				trigger: heroCaption,
				start: "top top",
				end: function() {
					const durationHeight = heroCaption.offsetHeight;
					return "+=" + durationHeight;
				},
				scrub: true,
			  },
			  scale: 0.5, 
			  duration: 1,	
			  ease: "power1.inOut",
			});
			
			ScrollTrigger.create({
				trigger: heroCaption,
				start: "top top",					
				end: function() {
					const durationHeight = heroCaption.offsetHeight;
					return "+=" + durationHeight;
				},
				scrub: true,
				animation: flip,
				pin:true,
			});
		
		} else {
			
			function setHeroProperties() {
				// The oversized hero-statement headline (css/tokens.css) can
				// wrap to more lines than fit in one viewport on short/narrow
				// screens; grow the box to fit rather than clipping against
				// #hero's overflow:hidden.
				var heroCaptionEl = document.querySelector("#hero-caption.height-title");
				if (heroCaptionEl) {
					gsap.set(heroCaptionEl, { height: Math.max(window.innerHeight, heroCaptionEl.scrollHeight) });
				}
			}

			setHeroProperties();
			
			window.addEventListener('resize', setHeroProperties);
		
			var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption', {
				duration: 1, 
				yPercent:5, 
				opacity:0.5, 
				ease:Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero',
					start: "top top",
					end: () => `+=${$('#hero').outerHeight()}`,
					scrub: true,
				}
			});
			
			var heroFooterParallax = gsap.to('#hero-footer', {
				duration: 1,
				opacity:0, 
				ease:Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero',
					start: "top 0%",
					end: function() {
						var durationHeight = $('#hero').outerHeight() * 1;
						return "+=" + durationHeight;
					},
					scrub: true,
				}
			});	
		
		}
		
		
		// Zoom Gallery	
		gsap.utils.toArray('.zoom-gallery').forEach((zoomGallery) => {
  
			const zoomGalleryWrapper = zoomGallery.querySelector(".zoom-wrapper-gallery");
			const zoomWrapperThumb = zoomGallery.querySelector(".zoom-wrapper-thumb");
			const ZoomItem = zoomGallery.querySelector(".zoom-center .zoom-img-wrapper");
			const zoomImgsWrapper = zoomGallery.querySelectorAll('li:not(.zoom-center) .zoom-img-wrapper');
			const zoomImgsWrapperAll = zoomGallery.querySelectorAll('li .zoom-img-wrapper');      
			const heightRatio = zoomGalleryWrapper.dataset.heightratio;  
  			const zoomImgsHeight = ZoomItem.offsetWidth * heightRatio;
			const paddingBottom = (window.innerHeight - zoomImgsHeight) / 2;
			
			gsap.set(zoomGallery, {paddingBottom: paddingBottom });
			gsap.set(zoomGalleryWrapper, {height: zoomImgsHeight });
			gsap.set(zoomWrapperThumb, {top: - paddingBottom, height: window.innerHeight });
  
			gsap.to(zoomGallery, {
				scrollTrigger: {
				  trigger: zoomGallery,
				  start: function() {
					const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight)/2;
					return "top +=" + startPin;
				  },
				  end: '+=200%',
				  scrub: true,
				  pin: true,
				}
			});

			gsap.to(zoomImgsWrapper, {
				scale:0.9,
				opacity:0,
				borderRadius: "0",
				ease: Linear.easeNone,
				scrollTrigger: {
				  trigger: zoomGallery,
				  start: function() {
					const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight)/2;
					return "top +=" + startPin;
				  },
				  end: '+=25%',
				  scrub: true,
				}
			});
    
			const state = Flip.getState(ZoomItem);      
			zoomWrapperThumb.appendChild(ZoomItem);
			  
			const zoomAnimation = Flip.from(state, {
				borderRadius: "0",
				absolute: true			
			});
			
			ScrollTrigger.create({
				trigger: zoomGalleryWrapper,
				start: function() {
				  const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight)/2;
				  return "top +=" + startPin;
				},
				end: '+=200%',
				scrub: true,
				animation: zoomAnimation,      
			});
  
		});	
		
		
		// Clipped Image 
		gsap.utils.toArray('.clipped-image-wrapper').forEach((clippedImageWrapper) => {
  
			const clippedImagePin = clippedImageWrapper.querySelector(".clipped-image-pin");
			const clippedImage = clippedImageWrapper.querySelector(".clipped-image");
			const clippedImageGradient = clippedImageWrapper.querySelector(".clipped-image-gradient");
			const clippedImageContent = clippedImageWrapper.querySelector(".clipped-image-content");
			
			gsap.set(clippedImageContent, { paddingTop: (window.innerHeight/2) + clippedImageContent.offsetHeight});
			
			gsap.set(clippedImageGradient, { backgroundColor: clippedImageGradient.closest(".content-row ").getAttribute("data-bgcolor")});
			
			function setClippedImageWrapperProperties() {
				gsap.set(clippedImageContent, { paddingTop:""});											
				gsap.set(clippedImageGradient, { height: window.innerHeight * 0.3});
				gsap.set(clippedImage, { height: window.innerHeight, });								
				gsap.set(clippedImageContent, { paddingTop: (window.innerHeight/2) + clippedImageContent.offsetHeight});
				gsap.set(clippedImageWrapper, { height: window.innerHeight + clippedImageContent.offsetHeight});
				
			}		
			
			imagesLoaded('body', function() {
				setClippedImageWrapperProperties();
			});
				
			
			
			window.addEventListener('resize', setClippedImageWrapperProperties);
  
			gsap.to(clippedImageGradient, {
				scrollTrigger: {
				  trigger: clippedImagePin,
				  start: function() {
						const startPin = 0;
						return "top +=" + startPin;
					  },
					end: function() {
						const endPin = clippedImageContent.offsetHeight;
						return "+=" + endPin;
					},
				  scrub: true,
				},
				opacity:1,
				y:1
			});
			
			var clippedImageAnimation = gsap.to(clippedImage, {
				clipPath: 'circle(75%)',
				scale: 1,
				//width: '100vw',
				opacity:1,
				duration: 1,
				ease: 'Linear.easeNone'
			});
			
			var clippedImageScene = ScrollTrigger.create({
				trigger: clippedImagePin,
				start: function() {
					const startPin = 0;
					return "top +=" + startPin;
				  },
				end: function() {
					const endPin = clippedImageContent.offsetHeight;
					return "+=" + endPin;
				},
				animation: clippedImageAnimation,
				scrub: 1,
				pin: true,
				pinSpacing: false,
			});
  
		});
		
		
		

		
		
		// Horizontal Gallery
		const panelsSections = gsap.utils.toArray( ".panels" );
		for (var i = 0; i < panelsSections.length; i++){
			
			thePanelsSection = panelsSections[i];
			const panels = gsap.utils.toArray(".panels-container .panel", thePanelsSection );
			const panelsImgs = gsap.utils.toArray(".panels-container .panel img", thePanelsSection );
			const panelsContainer = thePanelsSection.querySelector(".panels-container");
			const widthRatio = thePanelsSection.dataset.widthratio;
			
			gsap.set([panelsContainer, panels], { height: window.innerHeight * 0.6 });
			gsap.set(panels, { width: window.innerHeight * widthRatio });
			
			
					
			var totalPanelsWidth = 0;
			panels.forEach(function( panel )  {
				totalPanelsWidth += $(panel).outerWidth(true);
			});
			gsap.set(panelsContainer, {width:totalPanelsWidth});
			
			gsap.set(thePanelsSection, { height: panelsContainer.offsetWidth - innerWidth + panelsContainer.offsetHeight });
			
			gsap.to(panels, {
				x: - totalPanelsWidth + innerWidth,
				ease: "none",
				scrollTrigger: {
					trigger: panelsContainer,
					pin: true,
					start: function() {
						const startPin = (window.innerHeight - panelsContainer.offsetHeight) / 2;
						return "top +=" + startPin;
					},
					end: function() {
						const endPin = panelsContainer.offsetWidth - innerWidth;
						return "+=" + endPin;
					},
					scrub: 1,
				}
			});			
		}	
			
		
		
		// Slowed Pin Section
		gsap.utils.toArray('.slowed-pin').forEach((slowedPin) => {
			
			const slowedText = slowedPin.querySelector('.slowed-text');
			const slowedTextWrapper = slowedPin.querySelector('.slowed-text-wrapper');
			const slowedImagesWrapper = slowedPin.querySelector('.slowed-images');	
			const slowedImages = slowedPin.querySelectorAll('.slowed-image img');
				
			gsap.to(slowedText, {
				scrollTrigger: {
					trigger:slowedText,
					scrub: true,
					pin:true,
					start: "top top",					
					end: function() {
						const durationHeight = slowedImagesWrapper.offsetHeight - window.innerHeight;
						return "+=" + durationHeight;
					},
				},
				y:window.innerHeight - slowedText.offsetHeight
			});
			
			gsap.from(slowedTextWrapper, {
				scrollTrigger: {
					trigger:slowedText,
					scrub: true,
					start: "top top",					
					end: function() {
						const durationHeight = slowedImagesWrapper.offsetHeight - window.innerHeight;
						return "+=" + durationHeight;
					},
				},
				y:100
			});
			
			slowedImages.forEach((sImage) => {			
				gsap.to(sImage, {
					scrollTrigger: {
						trigger:sImage,
						scrub: true,
						start: "top 100%",
					},
					scale:1,
					y:0
				});
			});	
		
		});
		
		gsap.utils.toArray('.fixed-title').forEach((fixedTitle) => {
			
			const fixedTitleSpans = fixedTitle.querySelectorAll('span');
			const scrollDuration = 1; 
			const stagger = scrollDuration / fixedTitleSpans.length;
			
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: fixedTitle,
					start: function() {
					  const startPin = (window.innerHeight - fixedTitle.offsetHeight)/2;
					  return "top +=" + startPin;
					},
					end: function() {
						const endPin = fixedTitle.offsetHeight;
						return "+=" + endPin;
					},
					pin:true,
					scrub: 1,
					pinSpacing: false,
				},
			});
			
			fixedTitleSpans.forEach((fixedTitleSpan, index) => {
				tl.to(fixedTitleSpan, {
					duration: scrollDuration,
					opacity: 1,
					ease: "none", 
					scaleY:1.2,
					delay: index * stagger,
				})
				.add("fixedTitleSpansPause", "+=0.1")			
				.to(fixedTitleSpan, {
					duration: scrollDuration,						
					ease: "none", 
					scaleY:1,
					delay: index * stagger,
				}, "fixedTitleSpansPause");
			});

			
		});
		
		
		// List Rotator
		gsap.utils.toArray('.list-rotator-wrapper').forEach((listRotatorWrapper) => {
  						
			const listRotatorTitle = listRotatorWrapper.querySelector(".list-rotator-title");
			const listRotatorPin = listRotatorWrapper.querySelector(".list-rotator-pin");
			const listRotator = listRotatorWrapper.querySelector(".list-rotator");
		
			if (!isMobile()) {
		
				const rTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: listRotatorPin,
						start: function() {
							const startPin = 0;
							return "top +=" + startPin;
						},
						end: function() {
							// Was innerHeight * 3 — took 3 full viewport-heights of
							// scroll to cycle through 5 items, reading as "stuck in
							// place" rather than one continuous scroll (DEC-030).
							const endPin =  window.innerHeight * 1;
							return "+=" + endPin;
						},
						pin: true,
						scrub: true,
					}
				});
				
				const listItems = gsap.utils.toArray('.list-rotator li');
				const stagger = 0.5;
				
				listItems.forEach((listItem, index) => {
					rTimeline.from(listItem, {
						duration: 1, 
						opacity: 0.1,
						delay: index * 0.5, 
					});
				});
				
				gsap.to(listRotator, {
					scrollTrigger: {
						trigger: listRotatorWrapper,
						start: function() {
							const startPin = 0;
							return "top +=" + startPin;
						},
						end: function() {
							const endPin = window.innerHeight * 1;
							return "+=" + endPin;
						},
						scrub: true,
					},
					y:- (listRotator.offsetHeight -  window.innerHeight)
				});
			
				gsap.to(listRotatorTitle, {
					scrollTrigger: {
						trigger: listRotatorTitle,
						start: function() {
							const startPin = 45;
							return "top +=" + startPin;
						},
						end: function() {
							const endPin = listRotator.offsetHeight * 2;
							return "+=" + endPin;
						},
						pin:true,
						scrub: true,
						pinSpacing: false,
						onEnter: function() { 
							gsap.to(listRotatorTitle, {duration: 0.3, opacity:1});				
						},
						onLeave: function() { 
							gsap.to(listRotatorTitle, {duration: 0.3, opacity:0});						
						},
						onEnterBack: function() { 
							gsap.to(listRotatorTitle, {duration: 0.3, opacity:1});	
						}, 
						onLeaveBack: function() { 
							gsap.to(listRotatorTitle, {duration: 0.3, opacity:0});						
						},
					}
				});
			
			}
  
		});
		
		
		
		
		imagesLoaded('body', function() {
			
			//Move Thumbs Gallery			
			if( $('.move-thumbs-wrapper').length > 0 ){
				
				if (!isMobile()) {
				
					function animateElements(moveThumbs, overlappingThumbs, moveThumbsParent) {
						
						moveThumbs.forEach((moveThumb, index) => {
							const state = Flip.getState(moveThumb);
							overlappingThumbs[index].appendChild(moveThumb);
							
							const moveAnimation = Flip.from(state, {
								duration: 1,
								ease: 'power4.inOut',
							});
							
							const startOffset = moveThumbsParent[index].dataset.start;
							const endOffset = moveThumbsParent[index].dataset.stop;
							
							ScrollTrigger.create({
								trigger: moveThumbsParent[index], // Folosim fiecare element parent în parte
								start: startOffset,
								end: endOffset,
								scrub: true,
								animation: moveAnimation,
							});
						
						});
				
						gsap.to(startThumbsCaption, {				  
							scrollTrigger: {
								trigger: startThumbsCaption,
								start: function() {
									const startPin = (window.innerHeight - startThumbsCaption.offsetHeight) / 2;
									return "top +=" + startPin;
								},
								end: function() {
									const durationHeight = window.innerHeight;
									return "+=" + durationHeight;
								},
								pin: true,
								pinSpacing: false,
								scrub: true,
							},
							opacity:0,	
							ease: "power1.inOut",
						});
				  
					}
			
				
					const moveThumbsWrapper = document.querySelector('.move-thumbs-wrapper');
					const startThumbsCaption = document.querySelector('.start-thumbs-caption');
					const moveThumbsParent = document.querySelectorAll('.start-thumbs-wrapper .start-move-thumb');
					const moveThumbs = document.querySelectorAll('.start-thumbs-wrapper .move-thumb-inner');
					const endThumbsWrapper = document.querySelector('.end-thumbs-wrapper');		
					const overlappingThumbs = document.querySelectorAll('.end-thumbs-wrapper .end-move-thumb');
					
					animateElements(Array.from(moveThumbs), Array.from(overlappingThumbs), Array.from(moveThumbsParent));
				
				}
			  			
			}	
			
			// Pinned Gallery	
			gsap.utils.toArray('.pinned-gallery').forEach((pinnedGallery) => {

				if (pinnedGallery && pinnedGallery.classList.contains('random-img-ratation')) {
					const rotatedImages = pinnedGallery.querySelectorAll('.pinned-image:not(:first-child):not(:last-child)');
					gsap.utils.toArray(rotatedImages).forEach((pImage, i, arr) => {
						let rotation = i % 2 === 0 ? gsap.utils.random(-4, 0) : gsap.utils.random(0, 4);
						gsap.set(pImage.querySelector('img'), { rotation: rotation });
					});
				}
			
				const pinnedImages = pinnedGallery.querySelectorAll('.pinned-image');
			
				pinnedImages.forEach((pImage, i, arr) => {
					if (i < arr.length - 1) {
						const durationMultiplier = arr.length - i - 1;
			
						ScrollTrigger.create({
							trigger: pImage,
							start: function() {
								const centerPin = (window.innerHeight - pImage.querySelector('img').offsetHeight) / 2;
								return "top +=" + centerPin;
							},
							end: function() {
								const durationHeight = pImage.offsetHeight * durationMultiplier;
								return "+=" + durationHeight;
							},
							pin: true,
							pinSpacing: false,
							scrub: true,
							animation: gsap.to(pImage.querySelector('img'), {
								scale: 0.95,
								opacity: 1,
								zIndex: 0,
								duration: 1,
								ease: Linear.easeNone
							}),
						});
					}
				});
			
			});
			
			
			// Pinned Sections
			if (window.innerWidth > 479) {			
				var pinnedSection = gsap.utils.toArray('.pinned-element');			
				pinnedSection.forEach(function(pinElement) {
					
					var parentNode = pinElement.parentNode;
					var scrollingElement = parentNode.querySelector('.scrolling-element');
					
					var pinnedScene = ScrollTrigger.create({
						trigger: pinElement,
						//start: "top top-=-50px",
						start: function() {
							const startPin = (window.innerHeight - pinElement.offsetHeight)/2;
							return "top +=" + startPin;
						  },
						end: () => `+=${scrollingElement.offsetHeight - pinElement.offsetHeight}`,
						pin: pinElement,
					});
				});
			}		
	
	
			// Vertical Parallax Columns
			if (window.innerWidth > 767) {
				gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement) => {
					var startMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.startparallax);
					var endMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.endparallax);				
					gsap.fromTo(
						parallaxElement, { y: -startMovement },	{ y: endMovement, ease: "none",
							scrollTrigger: {
								trigger: parallaxElement,
								scrub: 0.5,
							}
						}
					);
				});
			}		
	
	
			// Moving Gallery		
			gsap.utils.toArray('.moving-gallery').forEach((section, index) => {
				const w = section.querySelector('.wrapper-gallery');
				const [x, xEnd] = (index % 2) ? [(section.offsetWidth - w.scrollWidth), 0] : [0, section.offsetWidth - w.scrollWidth];
				gsap.fromTo(w, {  x  }, {
					x: xEnd,
					scrollTrigger: { 
						trigger: section,
						scrub: 0.5,
					}
				});
			});
			
			// Reveal Gallery
			gsap.utils.toArray('.reveal-gallery').forEach((revealGallery) => {
				
				const imgFixed = revealGallery.querySelector('.reveal-img-fixed');
				const imgRotateLeft = revealGallery.querySelector('.reveal-img:first-child');
				const imgRotateRight = revealGallery.querySelector('.reveal-img:last-child');
				
				gsap.set(imgRotateLeft, { left: "50%", transform: "translateX(-50%)" });
				gsap.set(imgRotateRight, { left: "50%", transform: "translateX(-50%)" });
				
				function setImgProperties() {								
					gsap.set(imgRotateLeft, { x: -imgFixed.offsetWidth * 0.35, height: revealGallery.offsetHeight, scale: 0.9 });
					gsap.set(imgRotateRight, { x: imgFixed.offsetWidth * 0.35, height: revealGallery.offsetHeight, scale: 0.9 });
				}			
				setImgProperties();
				
				window.addEventListener('resize', setImgProperties);
					
				gsap.to(imgRotateLeft, {
					scrollTrigger: {
						trigger:revealGallery,
						scrub: true,
						start: "top 100%",					
						end: function() {
							const durationHeight = revealGallery.offsetHeight + window.innerHeight;
							return "+=" + durationHeight;
						},
						invalidateOnRefresh: true,
					},				
					x: function() {
						return -imgFixed.offsetWidth * 0.65;
					},
					rotation:-12
				});
				
				gsap.to(imgRotateRight, {
					scrollTrigger: {
						trigger:revealGallery,
						scrub: true,
						start: "top 100%",					
						end: function() {
							const durationHeight = revealGallery.offsetHeight + window.innerHeight;
							return "+=" + durationHeight;
						},
						invalidateOnRefresh: true,
					},
					x: function() {
						return imgFixed.offsetWidth * 0.65;
					},
					rotation:12
				});
			
			});
			
				
			// Roling Text	
			let direction = 1;				
			const marqueeFw = roll(".marquee-text.fw", {duration: 20});
			const marqueeBw = roll(".marquee-text.bw", {duration: 20}, true);
			
					
			scroll = ScrollTrigger.create({
				onUpdate(self) {
					if (self.direction !== direction) {
						direction *= -1;
						gsap.to([marqueeFw, marqueeBw], {timeScale: direction, overwrite: true});
					}
				}
			});
		
			function roll(targets, vars, reverse) {
				const tl = gsap.timeline({
					repeat: -1,
					onReverseComplete() { 
						this.totalTime(this.rawTime() + this.duration() * 10); 
					}
				});  
				vars = vars || {};
				vars.ease || (vars.ease = "none");
				gsap.utils.toArray(targets).forEach(el => {
					let clone = el.cloneNode(true);
					el.parentNode.appendChild(clone);
					gsap.set(clone, {position: "absolute", top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)});
					gsap.to(clone.querySelectorAll("span"), {duration: 0.7, y: 0, opacity:1, delay:0.5, ease:Power2.easeOut});
					tl.to([el, clone], {xPercent: reverse ? 100 : -100, ...vars}, 0);
				});
				return tl;
			}

		
		});	
		
		
		// Page and Project Navigation
		
		function setPageNavProperties() {								
			gsap.set(".page-nav-caption.height-title", { height: window.innerHeight - $('footer').height()});						
		}
		
		setPageNavProperties();
		
		window.addEventListener('resize', setPageNavProperties);
							
		var NextheroPin = gsap.to('.next-project-wrap', {
			duration: 1, 
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '.next-project-wrap',
				start: "top top",						
				end: '+=100%',
				pin: true,
				scrub: true,
			}
		});
		
		var nextProjectImageParallax = gsap.to('.next-project-image', {
			duration: 1, 
			clipPath: 'inset(0% 0% 0% 0%)',
			scale:1.05,
			rotation: 0,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: 'top 0%',
				end: '+=100%',
				scrub: true,
			}			
		});
		
		var nextAllWorks = gsap.to('.next-caption', {
			opacity: 1,
			scale:0.5,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: 'top 0%',
				end: '+=100%',
				scrub: true,
			}			
		});			
		
		var nextProjectProgress = gsap.to('.next-hero-progress span', {
			duration: 1, 
			width: "100%", 
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: 'top top',
				end: '+=100%',
				scrub: true,
			}
		});	
		
		var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
			duration: 1, 
			top: "0", 
			scale: 1, 
			opacity: 1, 
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#page-nav',
				start: 'top 100%',
				end: () => `+=${$('#page-nav').outerHeight() + $('footer').outerHeight()}`,
				scrub: true,
			}			
		});
			
		
		
		
		// Elements Animation
		
		var contentVideo = gsap.utils.toArray('.content-video-wrapper');			
		contentVideo.forEach(function(videoPlay) {
			var video = videoPlay.querySelector("video");
			
			var videoScene = ScrollTrigger.create({
				trigger: videoPlay,
				start: "top 100%",
				end: () => `+=${videoPlay.offsetHeight + window.innerHeight*2}`,
				onEnter: function() {
					 video.play();
				},
				onLeave: function() {
					 video.pause();
				},
				onEnterBack: function() {
					 video.play();
				},
				onLeaveBack: function() {
					 video.pause();
				},
			});
		});
			
		var hasParallax = gsap.utils.toArray('.has-parallax');
		hasParallax.forEach(function(hParallax) {
			var bgImage = hParallax.querySelector("img");
			var bgVideo = hParallax.querySelector("video");
			var parallax = gsap.fromTo( [bgImage, bgVideo], {y: '-20%', scale:1.15}, {y: '20%', scale:1, duration: 1, ease:Linear.easeNone});
			var parallaxScene = ScrollTrigger.create({
				trigger: hParallax,
				start: "top 100%",
				end: () => `+=${hParallax.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: true
			});
		});

		// Capabilities bento grid (Home) — one "featured" card at a time;
		// clicking another card swaps which grid slot is featured via
		// GSAP Flip (already loaded/registered for the hero's own Flip
		// usage above). Desktop: slot swap. Mobile (<=767px, matches the
		// CSS breakpoint): single-column accordion instead — see
		// DESIGN_SYSTEM.md interaction spec 6 / DECISIONS.md DEC-033.
		var capShell = document.querySelector('.cap2-shell');
		if (capShell) {
			var capGrid = capShell.querySelector('.cap2-grid');
			var capCards = Array.prototype.slice.call(capShell.querySelectorAll('.cap2-card'));
			var capNavDots = Array.prototype.slice.call(capShell.querySelectorAll('.cap2-nav-dot'));
			var capNavCurrent = capShell.querySelector('.cap2-nav-current');
			var capPrev = capShell.querySelector('.cap2-nav-prev');
			var capNext = capShell.querySelector('.cap2-nav-next');
			var capReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			var capIsMobile = function() { return window.matchMedia('(max-width: 767px)').matches; };

			// Title/eyebrow/statement/taxonomy use the sitewide
			// .has-animation/.has-mask-fill defaults (see their classes
			// in index.html) — same treatment as every other section
			// heading, including Point of View's promoted statement.
			//
			// Cards: a big, visible, scroll-driven descent — in the
			// spirit of this codebase's dormant .move-thumbs-wrapper
			// gallery effect (a large, scroll-scrubbed transformation),
			// adapted to text cards instead of replicating its two-state
			// thumbnail-swap structure. A short scrub over a small pixel
			// range (the first version of this) barely registers on a
			// fast scroll, so desktop PINS the section for the sequence
			// — the same technique this page already uses for the hero,
			// the ticker, and Point of View — guaranteeing the cascade
			// gets real screen time regardless of scroll speed. Mobile
			// skips the pin (consistent with how the ticker/
			// pinned-section already degrade on mobile — pinning reads
			// as "stuck" on a touch device) and just settles each card
			// in as it's scrolled to. Gated behind prefers-reduced-motion
			// per DESIGN_SYSTEM.md's accessibility principle that ALL
			// scroll-scrubbed motion (not just continuous/idle effects)
			// must be gated — unlike a one-time reveal, which this
			// codebase leaves unguarded.
			if (capCards.length && !capReducedMotion) {
				if (!isMobile()) {
					// start: 'top top' (not 'top 80%') — matches this
					// page's other pins (hero, ticker). Pinning while the
					// section's top is still 80% down the viewport left a
					// tall empty gap above it for the whole pinned
					// duration; pinning at the natural "top meets top"
					// point means the section is already filling the
					// viewport when it freezes.
					var capCascadeTl = gsap.timeline({
						scrollTrigger: {
							trigger: capShell,
							start: 'top top',
							end: function() { return '+=' + window.innerHeight; },
							scrub: true,
							pin: true,
							pinSpacing: true
						}
					});
					capCards.forEach(function(card, i) {
						capCascadeTl.to(card, {
							y: 0, opacity: 1, scale: 1,
							ease: 'power2.out', duration: 1
						}, i * 0.35);
					});
				} else {
					capCards.forEach(function(card) {
						gsap.to(card, {
							y: 0, opacity: 1, scale: 1,
							duration: 0.6, ease: 'power2.out',
							scrollTrigger: { trigger: card, start: 'top 92%' }
						});
					});
				}
			}

			var capCardById = function(id) {
				return capCards.filter(function(c) { return c.getAttribute('data-cap') === String(id); })[0];
			};
			var capActiveId = function() {
				var featured = capCards.filter(function(c) { return c.classList.contains('cap2-card--featured'); })[0];
				return featured ? featured.getAttribute('data-cap') : capCards[0].getAttribute('data-cap');
			};

			var capSyncNav = function(activeId) {
				capNavDots.forEach(function(dot) {
					dot.setAttribute('aria-selected', dot.getAttribute('data-cap') === activeId ? 'true' : 'false');
				});
				if (capNavCurrent) capNavCurrent.textContent = ('0' + activeId).slice(-2);
			};

			var capSetFeatured = function(id) {
				var current = capActiveId();
				if (current === id) return;
				var target = capCardById(id);
				var previous = capCardById(current);
				if (!target || !previous) return;

				var doSwap = function() {
					var targetSlot = target.getAttribute('data-slot');
					var previousSlot = previous.getAttribute('data-slot');
					target.setAttribute('data-slot', previousSlot);
					previous.setAttribute('data-slot', targetSlot);
					previous.classList.remove('cap2-card--featured');
					target.classList.add('cap2-card--featured');
					previous.querySelector('.cap2-card-inner').setAttribute('aria-expanded', 'false');
					target.querySelector('.cap2-card-inner').setAttribute('aria-expanded', 'true');
					capSyncNav(id);
				};

				if (capReducedMotion || typeof Flip === 'undefined') {
					doSwap();
					return;
				}
				var state = Flip.getState(capCards);
				doSwap();
				Flip.from(state, { duration: 0.7, ease: 'power3.inOut' });
			};

			var capToggleExpanded = function(id) {
				var card = capCardById(id);
				if (!card) return;
				var wasExpanded = card.classList.contains('cap2-card--expanded');
				capCards.forEach(function(c) {
					c.classList.remove('cap2-card--expanded');
					c.querySelector('.cap2-card-inner').setAttribute('aria-expanded', 'false');
				});
				if (!wasExpanded) {
					card.classList.add('cap2-card--expanded');
					card.querySelector('.cap2-card-inner').setAttribute('aria-expanded', 'true');
				}
				capSyncNav(id);
			};

			var capActivate = function(id) {
				if (capIsMobile()) {
					capToggleExpanded(id);
				} else {
					capSetFeatured(id);
				}
			};

			var capStep = function(direction) {
				var ids = capCards.map(function(c) { return parseInt(c.getAttribute('data-cap'), 10); });
				var current = parseInt(capActiveId(), 10);
				var idx = ids.indexOf(current);
				var next = ids[(idx + direction + ids.length) % ids.length];
				capActivate(String(next));
			};

			capCards.forEach(function(card) {
				var inner = card.querySelector('.cap2-card-inner');
				var id = card.getAttribute('data-cap');
				inner.addEventListener('click', function() { capActivate(id); });
				inner.addEventListener('keydown', function(e) {
					if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
						e.preventDefault();
						capActivate(id);
					}
				});
			});

			capNavDots.forEach(function(dot) {
				dot.addEventListener('click', function() { capActivate(dot.getAttribute('data-cap')); });
			});

			if (capPrev) capPrev.addEventListener('click', function() { capStep(-1); });
			if (capNext) capNext.addEventListener('click', function() { capStep(1); });

			// Cursor parallax on index/icon — skipped under reduced-motion
			// and on touch devices (no meaningful "cursor" there).
			if (!capReducedMotion && !window.matchMedia('(pointer: coarse)').matches) {
				capCards.forEach(function(card) {
					var inner = card.querySelector('.cap2-card-inner');
					inner.addEventListener('mousemove', function(e) {
						var rect = inner.getBoundingClientRect();
						var mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
						var my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
						inner.style.setProperty('--mx', mx.toFixed(3));
						inner.style.setProperty('--my', my.toFixed(3));
					});
					inner.addEventListener('mouseleave', function() {
						inner.style.setProperty('--mx', 0);
						inner.style.setProperty('--my', 0);
					});
				});
			}

			// Ambient 3D wave-mesh (Three.js, already loaded sitewide for
			// the WebGL grid-fit effect — see TECHNICAL_STANDARDS.md's
			// approved-libraries list, so this isn't a new dependency).
			// A field of warm copper/gold points on an undulating surface,
			// GPU-displaced in the vertex shader via simplex noise + sine
			// waves. Skipped (renders one static frame, no RAF loop) under
			// reduced-motion.
			var capField = capShell.querySelector('.cap2-field');
			if (capField && typeof THREE !== 'undefined') {
				var CAP3D_VERTEX_SHADER = [
					'uniform float uTime;',
					'uniform vec2 uMouse;',
					'attribute float aRandom;',
					'varying float vElevation;',
					'varying float vRandom;',
					'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
					'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
					'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
					'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
					'float snoise(vec3 v){',
					'  const vec2 C=vec2(1.0/6.0,1.0/3.0);',
					'  const vec4 D=vec4(0.0,0.5,1.0,2.0);',
					'  vec3 i=floor(v+dot(v,C.yyy));',
					'  vec3 x0=v-i+dot(i,C.xxx);',
					'  vec3 g=step(x0.yzx,x0.xyz);',
					'  vec3 l=1.0-g;',
					'  vec3 i1=min(g.xyz,l.zxy);',
					'  vec3 i2=max(g.xyz,l.zxy);',
					'  vec3 x1=x0-i1+C.xxx;',
					'  vec3 x2=x0-i2+C.yyy;',
					'  vec3 x3=x0-D.yyy;',
					'  i=mod289(i);',
					'  vec4 p=permute(permute(permute(',
					'      i.z+vec4(0.0,i1.z,i2.z,1.0))',
					'    +i.y+vec4(0.0,i1.y,i2.y,1.0))',
					'    +i.x+vec4(0.0,i1.x,i2.x,1.0));',
					'  float n_=0.142857142857;',
					'  vec3 ns=n_*D.wyz-D.xzx;',
					'  vec4 j=p-49.0*floor(p*ns.z*ns.z);',
					'  vec4 x_=floor(j*ns.z);',
					'  vec4 y_=floor(j-7.0*x_);',
					'  vec4 x=x_*ns.x+ns.yyyy;',
					'  vec4 y=y_*ns.x+ns.yyyy;',
					'  vec4 h=1.0-abs(x)-abs(y);',
					'  vec4 b0=vec4(x.xy,y.xy);',
					'  vec4 b1=vec4(x.zw,y.zw);',
					'  vec4 s0=floor(b0)*2.0+1.0;',
					'  vec4 s1=floor(b1)*2.0+1.0;',
					'  vec4 sh=-step(h,vec4(0.0));',
					'  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;',
					'  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
					'  vec3 p0=vec3(a0.xy,h.x);',
					'  vec3 p1=vec3(a0.zw,h.y);',
					'  vec3 p2=vec3(a1.xy,h.z);',
					'  vec3 p3=vec3(a1.zw,h.w);',
					'  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
					'  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;',
					'  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);',
					'  m=m*m;',
					'  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
					'}',
					'void main() {',
					'  vec3 pos = position;',
					'  float n = snoise(vec3(pos.x * 0.35, pos.z * 0.35, uTime * 0.06));',
					'  float wave = sin(pos.x * 0.5 + uTime * 0.25) * 0.18 + sin(pos.z * 0.4 - uTime * 0.2) * 0.18;',
					'  float mouseDist = length(pos.xz - uMouse);',
					'  float mouseInfluence = smoothstep(3.5, 0.0, mouseDist) * 0.5;',
					'  pos.y += n * 0.9 + wave + mouseInfluence;',
					'  vElevation = pos.y;',
					'  vRandom = aRandom;',
					'  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
					'  gl_PointSize = (16.0 + aRandom * 12.0) * (1.0 / -mvPosition.z);',
					'  gl_Position = projectionMatrix * mvPosition;',
					'}'
				].join('\n');

				var CAP3D_FRAGMENT_SHADER = [
					'precision mediump float;',
					'varying float vElevation;',
					'varying float vRandom;',
					'uniform vec3 uColorLow;',
					'uniform vec3 uColorHigh;',
					'void main() {',
					'  float dist = length(gl_PointCoord - vec2(0.5));',
					'  if (dist > 0.5) discard;',
					'  float alpha = smoothstep(0.5, 0.0, dist);',
					'  float t = clamp(vElevation * 0.6 + 0.5, 0.0, 1.0);',
					'  vec3 color = mix(uColorLow, uColorHigh, t);',
					'  gl_FragColor = vec4(color, alpha * (0.22 + vRandom * 0.3));',
					'}'
				].join('\n');

				var cap3dRenderer = new THREE.WebGLRenderer({ canvas: capField, alpha: true, antialias: true });
				cap3dRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

				var cap3dScene = new THREE.Scene();
				cap3dScene.fog = new THREE.FogExp2(0x0b0b0d, 0.1);

				var cap3dCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
				var cap3dBaseCameraX = 0;
				cap3dCamera.position.set(cap3dBaseCameraX, 3.4, 6.4);
				cap3dCamera.lookAt(0, 0, 0);

				var cap3dCols = 90, cap3dRows = 60, cap3dSpanX = 13, cap3dSpanZ = 9;
				var cap3dPositions = new Float32Array(cap3dCols * cap3dRows * 3);
				var cap3dRandoms = new Float32Array(cap3dCols * cap3dRows);
				var p3i = 0;
				for (var ry = 0; ry < cap3dRows; ry++) {
					for (var cx = 0; cx < cap3dCols; cx++) {
						var u = cx / (cap3dCols - 1) - 0.5;
						var v = ry / (cap3dRows - 1) - 0.5;
						cap3dPositions[p3i * 3] = u * cap3dSpanX;
						cap3dPositions[p3i * 3 + 1] = 0;
						cap3dPositions[p3i * 3 + 2] = v * cap3dSpanZ;
						cap3dRandoms[p3i] = Math.random();
						p3i++;
					}
				}

				var cap3dGeometry = new THREE.BufferGeometry();
				cap3dGeometry.setAttribute('position', new THREE.BufferAttribute(cap3dPositions, 3));
				cap3dGeometry.setAttribute('aRandom', new THREE.BufferAttribute(cap3dRandoms, 1));

				var cap3dMaterial = new THREE.ShaderMaterial({
					uniforms: {
						uTime: { value: 0 },
						uMouse: { value: new THREE.Vector2(0, 0) },
						uColorLow: { value: new THREE.Color('#3a2418') },
						uColorHigh: { value: new THREE.Color('#e8b878') }
					},
					vertexShader: CAP3D_VERTEX_SHADER,
					fragmentShader: CAP3D_FRAGMENT_SHADER,
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending
				});

				var cap3dPoints = new THREE.Points(cap3dGeometry, cap3dMaterial);
				cap3dScene.add(cap3dPoints);

				var cap3dTargetMouse = new THREE.Vector2(0, 0);

				var cap3dResize = function() {
					var rect = capShell.getBoundingClientRect();
					var w = Math.max(rect.width, 1);
					var h = Math.max(rect.height, 1);
					cap3dRenderer.setSize(w, h, false);
					cap3dCamera.aspect = w / h;
					cap3dCamera.updateProjectionMatrix();
				};
				cap3dResize();

				if (!capReducedMotion && !window.matchMedia('(pointer: coarse)').matches) {
					capShell.addEventListener('mousemove', function(e) {
						var rect = capShell.getBoundingClientRect();
						var nx = (e.clientX - rect.left) / rect.width - 0.5;
						var ny = (e.clientY - rect.top) / rect.height - 0.5;
						cap3dTargetMouse.set(nx * cap3dSpanX, ny * cap3dSpanZ);
					});
				}

				var cap3dClock = new THREE.Clock();
				var cap3dRafId = null;

				var cap3dRender = function() {
					cap3dMaterial.uniforms.uTime.value = cap3dClock.getElapsedTime();
					cap3dMaterial.uniforms.uMouse.value.lerp(cap3dTargetMouse, 0.04);
					cap3dCamera.position.x += (cap3dBaseCameraX + cap3dTargetMouse.x * 0.15 - cap3dCamera.position.x) * 0.03;
					cap3dCamera.lookAt(0, 0, 0);
					cap3dRenderer.render(cap3dScene, cap3dCamera);
					if (!capReducedMotion) cap3dRafId = requestAnimationFrame(cap3dRender);
				};
				cap3dRender();

				var cap3dResizeTimer;
				window.addEventListener('resize', function() {
					clearTimeout(cap3dResizeTimer);
					cap3dResizeTimer = setTimeout(cap3dResize, 150);
				});

				// The AJAX page-transition system (js/scripts.js,
				// CleanupBeforeAjax) calls this before swapping content, so
				// this WebGL context/RAF loop doesn't keep running after the
				// section leaves the DOM.
				window.__cap2FieldCleanup = function() {
					if (cap3dRafId) cancelAnimationFrame(cap3dRafId);
					cap3dGeometry.dispose();
					cap3dMaterial.dispose();
					cap3dRenderer.dispose();
				};
			}
		}

		// Home signature section — a dedicated scroll-scrub image parallax,
		// deliberately NOT using the .has-parallax class above: that class
		// is also targeted by an unrelated mobile-only "make it exactly
		// window height" fix a few hundred lines up (isMobile() block,
		// `$('.smooth-scroll main, .has-parallax, nav, ...').css({'height':
		// winHeight})`), which is correct for that block's full-viewport
		// background use cases but wrong for this aspect-ratio-sized
		// portrait card. Gated per TECHNICAL_STANDARDS.md ("respect
		// prefers-reduced-motion in every new or modified animation-driving
		// code path").
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			var signatureCard = document.querySelector('.signature-card');
			var signatureImg = signatureCard ? signatureCard.querySelector('img') : null;
			if (signatureCard && signatureImg) {
				var signatureParallax = gsap.fromTo(signatureImg, {y: '-20%', scale: 1.15}, {y: '20%', scale: 1, duration: 1, ease: Linear.easeNone});
				ScrollTrigger.create({
					trigger: signatureCard,
					start: "top 100%",
					end: () => `+=${signatureCard.offsetHeight + window.innerHeight}`,
					animation: signatureParallax,
					scrub: true
				});
			}
		}
		
		var hasAnimation = gsap.utils.toArray('.has-animation');			
		hasAnimation.forEach(function(hAnimation) {
			var delayValue = parseInt(hAnimation.getAttribute("data-delay")) || 0;
			gsap.to(hAnimation, { 					
				scrollTrigger: {
					trigger: hAnimation,
					start: "top 85%",
					onEnter: function() {
						hAnimation.classList.add('animated');
					},
				},
				opacity: 1,
				y:0,
				duration: 0.5,
				ease:Power2.easeOut,
				delay: delayValue / 1000,
			});
		});
	
		$(".has-cover").css('background-color', function () {
			return $(this).parents(".content-row").data('bgcolor')
		});
		
		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		var hasMask = gsap.utils.toArray('.has-mask');			
		hasMask.forEach(function(hMask) {
			var delayValue = parseInt(hMask.getAttribute("data-delay")) || 0;
			var spanMask = hMask.querySelectorAll("span > span");
			gsap.to(spanMask, { 					
				scrollTrigger: {
					trigger: hMask,
					start: "top 85%",
					onEnter: function() {
						hMask.classList.add('animated');
					},
				},
				opacity: 1,
				y:0,
				duration: 0.5,
				ease:Power2.easeOut,
				delay: delayValue / 1000,
			});
		});
		
		$('.has-mask-fill').each(function(){
			var words = $(this).text();
			var total = words;
			$(this).empty();
			$(this).append($("<span /> ").text(words));
		});
		
		$('.has-mask-fill.block-title').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}			
		});
		
		var hasMaskFill = gsap.utils.toArray('.has-mask-fill');			
		hasMaskFill.forEach(function(hMaskFill) {				
			var spanFillMask = hMaskFill.querySelectorAll("span");
			gsap.to(spanFillMask, { 					
				scrollTrigger: {
					trigger: hMaskFill,
					start: "top 85%",
					end: () => `+=${hMaskFill.offsetHeight * 2}`,
					scrub: 1,
				},
				duration: 1, 
				backgroundSize:"200% 100%", 
				stagger:0.5,  
				ease:Linear.easeNone,
			});
		});
		
		$('.has-opacity').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index] + " "));
			}
		});

		// Word-by-word reveal for .has-opacity text. Originally a
		// continuous scroll-scrub (scrub:1) tied to the element's own
		// height: text sat at a dim, low-contrast 0.2 opacity resting
		// state until scrolled fully past, re-dimming if the user
		// scrolled back up. Changed to a one-time reveal (toggleActions
		// "play none none none") that plays once on entry and leaves
		// text fully visible regardless of further scroll position, and
		// is skipped entirely under prefers-reduced-motion (text starts
		// and stays fully visible, no animation).
		var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var hasOpacity = gsap.utils.toArray('.has-opacity');
		hasOpacity.forEach(function(hOpacity) {
			var spanOpacity = hOpacity.querySelectorAll("span");
			if (prefersReducedMotion) {
				gsap.set(spanOpacity, { opacity: 1 });
				return;
			}
			gsap.to(spanOpacity, {
				scrollTrigger: {
					trigger: hOpacity,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				duration: 0.8,
				opacity:1,
				stagger:0.05,
				ease:Power2.easeOut,
			});
		});
		
		var counter = gsap.utils.toArray('.number-counter');		
		counter.forEach(function(countNumber) {
			gsap.fromTo(countNumber, {innerText: countNumber.innerText}, {innerText: function() {return Math.floor(parseFloat(countNumber.getAttribute('data-target')));},
				duration: 1,
				snap: { innerText: 1 }, 
				scrollTrigger: {
					trigger: countNumber,
					start: "top 90%", 
				}
			});
		});
		
		var titleMovingForward = gsap.utils.toArray('.title-moving-forward');			
		titleMovingForward.forEach(function(movingTitle) {
			var parallax = gsap.to( movingTitle, 1, {x: -(movingTitle.offsetWidth  - window.innerWidth) , ease:Linear.easeNone});						
			var parallaxScene = ScrollTrigger.create({
				trigger: movingTitle,
				end: () => `+=${movingTitle.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: 2,
			});
		});
		
		var titleMovingBackward = gsap.utils.toArray('.title-moving-backward');			
		titleMovingBackward.forEach(function(movingTitle) {
			gsap.set(movingTitle,{x:-(movingTitle.offsetWidth - window.innerWidth)});
			var parallax = gsap.to( movingTitle, 1, {x: 0 , ease:Linear.easeNone});						
			var parallaxScene = ScrollTrigger.create({
				trigger: movingTitle,
				end: () => `+=${movingTitle.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: 2,
			});
		});
					
		
		// Content Row Options
		
		if ($(".content-row").hasClass("light-section")) {
			$(".light-section").each(function(i) {				
				$(this).wrap( "<div class='light-section-wrapper'><div class='light-section-container content-max-width'></div></div>" );
				$("body").find(".light-section-wrapper").each(function(i) {				
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}
		
		if ($(".content-row").hasClass("dark-section")) {
			$(".dark-section").each(function(i) {				
				$(this).wrap( "<div class='dark-section-wrapper'><div class='dark-section-container content-max-width'></div></div>" );			
				$("body").find(".dark-section-wrapper").each(function(i) {				
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}
		
		$('.content-row.has-clip-path').parent().parent().addClass('clip-effects');
		
		var hasClipPath = gsap.utils.toArray('.has-clip-path');
		hasClipPath.forEach(function(hClipPath) {
			var clipEffects = hClipPath.closest('.clip-effects');
			var initialClipPath = window.getComputedStyle(clipEffects).clipPath;
		
			var clipPath = gsap.to(clipEffects, {
				clipPath: 'inset(0% 0% round 0px)',
				duration: 1,
				ease: 'power1.inOut',
			});
		
			var clipPathScene = ScrollTrigger.create({
				trigger: hClipPath,
				start: 'top 90%',
				end: `+=${window.innerHeight * 0.8}`,
				animation: clipPath,
				scrub: true,
			});
		});


		
		if ($('.change-header-color').length > 0) {
			imagesLoaded('body', function() {
				setTimeout(function() {
					var changeHeaderColor = gsap.utils.toArray('.change-header-color');	
					changeHeaderColor.forEach(function(changeHeaderElement) {						
						var pageHeader = document.querySelector('header');							
						gsap.to(changeHeaderElement, {
							scrollTrigger: {
								trigger: changeHeaderElement,
								start: "top 8%",									
								end: () => `+=${changeHeaderElement.offsetHeight}`,
								//markers: true,
								onEnter: function() {
									pageHeader.classList.add('white-header');
								},
								onEnterBack: function() {
									pageHeader.classList.add('white-header');
								},
								onLeave: function() {
									pageHeader.classList.remove('white-header');
								},
								onLeaveBack: function() {
									pageHeader.classList.remove('white-header');
								} 
							}
						});
					});
					
				}, 100);
			});
		}
		
		if ($('#clapat-page-content').hasClass("light-content")) {
			if ($('#project-nav').hasClass("change-header")) {
		  		imagesLoaded('body', function() {
					setTimeout(function() {	
						var pageNav = document.querySelector('#project-nav.change-header');
						if (pageNav) {
							var pageContent = document.querySelector('#clapat-page-content');	
							var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
								scrollTrigger: {
									trigger: pageNav,
									start: "top 8%",
									end: () => `+=${pageNav.offsetHeight}`,
									onEnter: function() {
										pageContent.classList.remove('light-content');
									},
									onEnterBack: function() {
										pageContent.classList.remove('light-content');
									},
									onLeave: function() {
										pageContent.classList.add('light-content');
									},
									onLeaveBack: function() {
										pageContent.classList.add('light-content');
									}
								}							
							});
						}
					}, 100);
				});
			}
		}
		
		if ($('#clapat-page-content').hasClass("dark-content")) {
			if ($('#project-nav').hasClass("change-header")) {
		  		imagesLoaded('body', function() {
					setTimeout(function() {	
						var pageNav = document.querySelector('#project-nav');
						if (pageNav) {
							var pageContent = document.querySelector('#clapat-page-content');
							var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
								scrollTrigger: {
									trigger: pageNav,
									start: "top 8%",
									end: () => `+=${pageNav.offsetHeight}`,
									onEnter: function() {
										pageContent.classList.add('light-content');
									},
									onEnterBack: function() {
										pageContent.classList.add('light-content');
									},
									onLeave: function() {
										pageContent.classList.remove('light-content');
									},
									onLeaveBack: function() {
										pageContent.classList.remove('light-content');
									}
								}							
							});
						}
					}, 100);
				});
			}
		}
		
		
		// Reinit All Scrolltrigger After Page Load
		
		imagesLoaded('body', function() {
			setTimeout(function() {	
				ScrollTrigger.refresh()
			}, 1000);
		});
		
		
	
	}// End Scroll Effects


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	
	
	window.FirstLoad = function() {
		
		$(window).on('popstate', function() {
			location.reload(true);
		});
		
		
		if ($("#clapat-page-content").hasClass("light-content")) {
			$("nav").css('background-color', function () {
				return $("header").data('menucolor')
			});
			
			gsap.to("main", {duration: 0.5, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor"), ease:Power2.easeInOut});
			
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					if ($("header").hasClass("fullscreen-menu")) {
						$("header").css('background-color', 'transparent');
					} else {
						if( $('#blog').length > 0 ){
							$("header").css('background-color', '#171717');
						}
						if( $('#post').length > 0 ){
							$("header").css('background-color', '#171717');
						}
					}
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {			
			$("nav").css('background-color', function () {
				return $("header").data('menucolor')
			});	
			
			gsap.to("main", {duration: 0.5, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor"), ease:Power2.easeInOut});
			
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){	
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					if ($("header").hasClass("fullscreen-menu")) {
						$("header").css('background-color', 'transparent');
					} else {
						if( $('#blog').length > 0 ){
							$("header").css('background-color', '#fff');
						}
						if( $('#post').length > 0 ){
							$("header").css('background-color', '#fff');
						}
					}
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}	
		
		$('.video-cover').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");	
			setTimeout(function(){
				$('#header-container').removeClass('light-content-header').removeClass('dark-content-header');
			} , 50 );
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			
			gsap.to("nav", {duration: 0.3, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor")});
			
			$('header').removeClass('white-header');
			$("#app").remove();
			setTimeout(function(){
				$("#canvas-slider.active").remove();						
			} , 300 );
			$(".temporary-hero").remove();
			
			gsap.to($(".fullscreen-menu .menu-timeline"), {duration: 0.3, y:-30, opacity:0, stagger:0.03, ease:Power2.easeIn});
				
			gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});			
			gsap.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app, #canvas-slider, #showcase-slider-webgl-holder, .showcase-pagination-wrap, #quickmenu-scroll, #blog, .next-project-image-wrapper"), {duration: 0.3, opacity:0, delay:0, ease:Power0.ease});					
			gsap.to($("#footer-container, .header-middle"), {duration: 0.3, opacity:0, ease:Power0.ease});
			gsap.to('#show-filters, #counter-wrap', {duration: 0.2, opacity:0});
		});
		
		
		//Load Page From Menu

		$('nav .ajax-link').on('click', function() {
			$(this).parents('.menu-timeline').addClass('hover');
			$(this).parents('.item-with-ul').addClass('hover');
			gsap.set($(this).find('span'),{yPercent:0});	
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();	
		});

		
		// Keyboard accessibility for the hamburger menu: role/tabindex/
		// aria-expanded are set here (once, in JS) rather than hand-added
		// to every page's duplicated header markup. Enter/Space trigger
		// the same toggle as a click; aria-expanded tracks open/closed.
		$('#burger-wrapper').attr({
			'role': 'button',
			'tabindex': '0',
			'aria-expanded': 'false',
			'aria-label': 'Menu'
		});
		$('#burger-wrapper').on('keydown', function(e) {
			if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
				e.preventDefault();
				$(this).trigger('click');
			}
		});

		$('#burger-wrapper, .menu .button-text').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');
			$('#burger-wrapper').attr('aria-expanded', $('#menu-burger').hasClass('open') ? 'true' : 'false');
			setTimeout( function(){
				if ($('#menu-burger').hasClass("open")) {
					
					gsap.to('nav', {duration: 0.3, opacity:1, ease:Power2.easeInOut});
					
					$('header').addClass('over-sidebar').addClass('over-white-section');
					if (!$('#page-content').hasClass("light-content")) {	
						$('#magic-cursor').addClass('light-content');
					}
					if ($('header').hasClass("invert-header")) {
						$('#header-container').addClass('light-content-header');
					} else {
						$('#header-container').addClass('dark-content-header');
					}
					gsap.set($("nav ul ul li"), {y: 0, opacity:1});
					//Fade In Navigation Lists
					gsap.set($(".menu-timeline .before-span"), {y: 160, opacity:0});
					gsap.to($(".menu-timeline .before-span"), {duration: 0.7, y:0, opacity:1, delay:0.4, stagger:0.1, ease:Power2.easeOut});
					  
					$('.menu-timeline > .touch-button').click(function(e, bIndirect) {						
						if( bIndirect == true ){
							return;
						}						
						let currentItem = $(this);
						$('.menu-timeline > .touch-button.active').each( function() {							
							if( currentItem.get(0) !== $(this).get(0) ) { 							
								$(this).trigger('click', true); 
							}  
						});						
					});
						
				} else {
					
					gsap.to('nav', {duration: 0.3, opacity:0, delay:0.6, ease:Power2.easeInOut});
						
					//Fade Out Navigation Lists						
					gsap.to($(".menu-timeline .before-span"), {duration: 0.5, y:-200, opacity:1, delay:0, stagger:0.05, ease:Power2.easeIn});
					gsap.to($("nav ul ul li"), {duration: 0.5, y:-120, opacity:0, delay:0, stagger:0.03, ease:Power2.easeIn});
					
					if (!$('#page-content').hasClass("light-content")) {	
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');							
						} , 500 );
					}
					if ($('header').hasClass("invert-header")) {
						setTimeout( function(){
							$('#header-container').removeClass('light-content-header');
						} , 500 );
					} else {
						setTimeout( function(){
							$('#header-container').removeClass('dark-content-header');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar')
						setTimeout( function(){
							$('header').removeClass('over-white-section');
						} , 350 );
					} , 500 );
				}							
			} , 20 );
		});
		
		$('.wpcf7-form-control-wrap').each( function() {			
			if( $( this ).has('label').length <= 0 ){
				$( this ).append('<label class="input_label"></label>');
			}
		});
		
	}// End First Load
	
	

	
	
/*--------------------------------------------------
Function FitThumbScreen WEBGL
---------------------------------------------------*/	
	
	window.FitThumbScreenWEBGL = function() { 
	
		if (!$("body").hasClass("disable-ajaxload")) {
		
			if ($("#itemsWrapper").hasClass("webgl-fitthumbs")) {
			
				if( $('#itemsWrapper').length > 0 ){
				
					function createDemoEffect(options) {
					  const transitionEffect = new GridToFullscreenEffect(
						document.getElementById("app"),
						document.getElementById("itemsWrapper"),
						Object.assign(
						  {
							scrollContainer: window,
							onToFullscreenStart: ({ index }) => {},
							onToFullscreenFinish: ({ index }) => {},
							onToGridStart: ({ index }) => {},
							onToGridFinish: ({ index, lastIndex }) => {}
						  },
						  options
						)
					  );
					
					  return transitionEffect;
					}
			
					let currentIndex;
					const itemsWrapper = document.getElementById("itemsWrapper");
					const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];
					
					let transitionEffectDuration = 0.0;			
					let transitionEffect = null;
					
					if ($(".webgl-fitthumbs").hasClass("fx-one")) {
						
						//FX 01 ////////////////////////////// .fx-one  
						
						transitionEffectDuration = 2.2;			
						transitionEffect = createDemoEffect({
							timing: {
								type: "sameEnd",
								sections: 0,
								duration: transitionEffectDuration,
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: {seed: "5000", frequency: 1, amplitude: 0}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});
					
					} else if($(".webgl-fitthumbs").hasClass("fx-two")) {
					
						//FX 02 ////////////////////////////// .fx-two  
					
						transitionEffectDuration = 1.8;			
						transitionEffect = createDemoEffect({
							activation: { type: "mouse" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "simplex",
								props: {
									seed: "8000",
									frequencyX: 0.2,
									frequencyY: 0.2,
									amplitudeX: 0.3,
									amplitudeY: 0.3
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Power1.easeInOut
							}
						});
					
					} else if($(".webgl-fitthumbs").hasClass("fx-three")) {
					
						//FX 03 ////////////////////////////// .fx-three  
					
						transitionEffectDuration = 1.8;			
						transitionEffect = createDemoEffect({
							activation: { type: "closestCorner" },
							timing: {
									duration: transitionEffectDuration
							},
							transformation: {
									type: "flipX"
							},
							flipBeizerControls: {
									c0: {
											x: 0.4,
											y: -0.8
									},
									c1: {
											x: 0.5,
											y: 0.9
									}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Power1.easeInOut
							}
						});
					
					} else if($(".webgl-fitthumbs").hasClass("fx-four")) {
					
					
						//FX 04 ////////////////////////////// .fx-four  
						
						transitionEffectDuration = 1.5;			
						transitionEffect = createDemoEffect({
							activation: { type: "sinX" },
							flipX: false,
							timing: {
								type: "sections",
								sections: 4,
								duration: transitionEffectDuration
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Power3.easeIn
							}
						});
					
					} else if($(".webgl-fitthumbs").hasClass("fx-five")) {
					
					
						//FX 05 ////////////////////////////// .fx-five  
					
						transitionEffectDuration = 1.8;			
						transitionEffect = createDemoEffect({
							timing: {
								type: "sections",
								sections: 1,
								duration: transitionEffectDuration
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: {
									seed: "8000",
									frequency: 0.1,
									amplitude: 1
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});
						
					} else if($(".webgl-fitthumbs").hasClass("fx-six")) {
					
					
						//FX 06 ////////////////////////////// .fx-six  
						
						transitionEffectDuration = 2;			
						transitionEffect = createDemoEffect({
							activation: { type: "bottom" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "wavy",
								props: {									
									frequency: 1,
									amplitude: 0
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Power2.easeInOut
							}
						});
						
					} else if($(".webgl-fitthumbs").hasClass("fx-seven")) {
					
					
						//FX 07 ////////////////////////////// .fx-seven  
						
						transitionEffectDuration = 2;			
						transitionEffect = createDemoEffect({
							activation: { type: "none" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "none",
								props: {									
									frequency: 1,
									amplitude: 0
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Power2.easeInOut
							}
						});
						
					} else {
						
						//FX 01 ////////////////////////////// .fx-one  
						
						transitionEffectDuration = 2.2;			
						transitionEffect = createDemoEffect({
							timing: {
								type: "sameEnd",
								sections: 0,
								duration: transitionEffectDuration,
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: {seed: "5000", frequency: 0.1, amplitude: 1}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;								
								gsap.to(itemsWrapper, {duration: .6, ease: Power1.easeInOut, opacity:1, delay:0,});		
								toggleFullview();
							},							
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, {duration:1, ease:Power3.easeInOut, scale: 1, opacity: 1,});
								toggleFullview();
							},							
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;								
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});
					}
										
					transitionEffect.init();
					
					if( $('#itemsWrapperLinks').length > 0 ){
						
						const itemsCaptions = document.getElementById("itemsWrapperLinks");
						const thumbsLink = [...itemsCaptions.querySelectorAll(".trigger-item-link")];
						for( let idxCaption = 0; idxCaption < thumbsLink.length; idxCaption++){						
							thumbsLink[idxCaption].addEventListener( "click", transitionEffect.createOnMouseDown( idxCaption ) );
						}
					}
					
					const toggleFullview = () => {
						if ( transitionEffect.isFullscreen ) {							
							transitionEffect.toGrid();							
						}
					};
		
					// Preload all the images in the pageI
					imagesLoaded(document.querySelectorAll(".grid__item-img"), instance => {
						
						let images = [];
						for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
							let image = {
								element: instance.elements[i],
								image: instance.images[i].isLoaded ? instance.images[i].img : null
							};
							if (i % 2 === 0) {
								imageSet = {};
								imageSet.small = image;
							}
		
							if (i % 2 === 1) {
								imageSet.large = image;
								images.push(imageSet);
							}
						}
						transitionEffect.createTextures(images);
					});
				
				}			
				
				var $body = $('body');
				$body.on('mousedown', function (evt) {
				  $body.on('mouseup mousemove', function handler(evt) {
					if (evt.type === 'mouseup') {
					  
					  $('#itemsWrapperLinks .trigger-item-link, #itemsWrapperLinks .trigger-item-link-secondary').on('click', function() {					
					
							let parent_item = $(this).closest( '.trigger-item' );
							parent_item.addClass('above');
							
							
							
							
							if (!$('#clapat-page-content').hasClass("light-content")) {
								
								if (!$('.portfolio').hasClass("portfolio-shortcode")) {
									if (!parent_item.hasClass("change-header")) {
										$('#clapat-page-content').delay(1200).queue(function(next){							
											$(this).addClass('light-content');
											next();
										});
									}								
								} else {								
									if (!parent_item.hasClass("change-header")) {
										$('#clapat-page-content').delay(1200).queue(function(next){							
											$(this).removeClass('light-content');
											next();
										});
									}
								}													
							} else {							
								if (!$('.portfolio').hasClass("portfolio-shortcode")) {
									if (parent_item.hasClass("change-header")) {
										$('#clapat-page-content').delay(1200).queue(function(next){							
											$(this).removeClass('light-content');
											next();
										});
									}
								} else {
									if (!parent_item.hasClass("change-header")) {
										$('#clapat-page-content').delay(1200).queue(function(next){							
											$(this).removeClass('light-content');
											next();
										});
									}
									
								}							
							}
									
								
											
							$('.clapat-slider .trigger-item').each(function(){
								if (!$(this).hasClass("above")) {
									gsap.to($(this), {duration: 0.5, delay:0, opacity:0, ease:Power4.easeInOut});
								} else  {
									gsap.to($(this), {duration: 0.5, delay:0.4, opacity:0, ease:Power4.easeInOut});	
								}
							});
							
							gsap.to('#hero, #show-filters, .item-caption-wrapper, .showcase-portfolio .slide-caption, #page-nav, footer, .fadeout-element', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', opacity:1});
							gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
							$("#ball").removeClass("with-icon");
							$('#ball p').remove();
							$('#ball i').remove();
							
							if ($('body').hasClass('hero-below-caption')) {
								var heroTranslate = $('.hero-translate').height();					
								gsap.to('#app canvas', {duration: 1, y:heroTranslate, delay:0.7, ease: Power3.easeInOut});
							} 
										
							$(this).delay(1500).queue(function() {
								var link = $(".above").find('a');
								link.trigger('click');
							});
						});
					  
					} else {
					  // drag
					}
					$body.off('mouseup mousemove', handler);
				  });
				});
				
				
				
				
				
			}  
		}
		
	}//End FitThumbScreenWEBGL
	
	
/*--------------------------------------------------
Function FitThumbScreen GSAP
---------------------------------------------------*/	
	
	window.FitThumbScreenGSAP = function() {  
	
		if (!$("body").hasClass("disable-ajaxload")) {
		
			if ($("#itemsWrapper").hasClass("no-fitthumbs")) {
				
				$('#itemsWrapperLinks .trigger-item-link').on('click', function() {
				  	const parentItem = $(this).closest('.trigger-item');
				  	parentItem.addClass('above-trigger');
				  	$("body").addClass("show-loader");
				
				  	const fadeOutTargets = $('#hero, #show-filters, .clapat-slider, .item, .item-caption-wrapper, #page-nav, footer, .fadeout-element');				  	
				  	const ball = $('#ball');
				  	const ballLoader = $('#ball-loader');
				
				  	const tl = gsap.timeline({
						defaults: { duration: 0.5, ease: Power4.easeInOut }
				  	});
				
				  	tl.to(fadeOutTargets, { opacity: 0 });				  	
				  	tl.to(ball, { borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', opacity: 1 }, "-=0.4");
				  	tl.to(ballLoader, { borderWidth: '4px', top: 0, left: 0 }, "-=0.4");
				
				  	$("#ball").removeClass("with-icon");
				  	$('#ball p, #ball i').remove();
				
				  	$(this).delay(1000).queue(function() {
						const link = $(".above-trigger").find('a');
						link.trigger('click');
				  	});
				});
			
			}
			
		} else {
				
			$('#itemsWrapperLinks .trigger-item').on('click', function() {
				
				$("body").addClass("show-loader");
				
				const fadeOutTargets = $('#hero, #show-filters, .clapat-slider, .item, .item-caption-wrapper, #page-nav, footer, .fadeout-element');
				const ball = $('#ball');
				const ballLoader = $('#ball-loader');
				
				const tl = gsap.timeline();
				
				tl.to(fadeOutTargets, { opacity: 0 });				  	
				tl.to(ball, { borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', opacity: 1 }, "-=0.4");
				tl.to(ballLoader, { borderWidth: '4px', top: 0, left: 0 }, "-=0.4");
			
				$("#ball").removeClass("with-icon");
				$('#ball p, #ball i').remove();
	
				
			});
		}
		
	}//End FitThumbScreenGSAP	

					


/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/

	window.Shortcodes = function() {  	
		// Buttons
		
		$('.button-border').each(function() {
			$(this).css('background-color', function () { return $(this).data('btncolor') });
			$(this).css('border-color', function () { return $(this).data('btncolor') });
			$(this).find("a").css('color', function () { return $(this).parent().data('btntextcolor')});
		});
		
		$('.button-border.outline').each(function() {
			$(this).css('background-color', 'transparent');
			$(this).css('border-color', function () { return $(this).data('btncolor')});
			$(this).find("a").css('color', function () { return $(this).parent().data('btncolor') });
			$(".button-border.outline").mouseenter(function(e) {	
				$(this).css('background-color', function () {return $(this).data('btncolor') });
				$(this).css('border-color', function () { return $(this).data('btncolor') });				
				$(this).find("a").css('color', function () { return $(this).parent().data('btntextcolor') });
			});
			$(".button-border.outline").mouseleave(function(e) {

				$(this).css('background-color', 'transparent');				
				$(this).css('border-color', function () { return $(this).data('btncolor') });				
				$(this).find("a").css('color', function () { return $(this).parent().data('btncolor') });	
			});				
		});
		
		// Accordion	  
		
		$('dd.accordion-content').slideUp(1).addClass('hide');		
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(350).siblings('dd.accordion-content').slideUp(350).prev().removeClass('accordion-active');
			$(this).delay(500).queue(function() {	
				ScrollTrigger.refresh();
			});
		});	
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(350);
			$(this).delay(500).queue(function() {	
				ScrollTrigger.refresh();
			});
		});
		
		$(".flexnav").flexNav({ 'animationSpeed' : 250 });
		
		// Project Share	
		
		$("#share").jsSocials({
            showLabel: false,
    		showCount: false,
    		shares: ["facebook", "twitter", "pinterest"]
        });
		
		$('.jssocials-share').wrap( "<div class='parallax-wrap'><div class='parallax-element'></div></div>" );
		
		if( $('.random-collage-wrap').length > 0 ){
		
			if ($(window).width() >= 1024) {
				
				$(".random-collage .rc-slide .item-wrap-image").on('mouseenter', function() {	
					var $this = $(this);			
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
				});
									
				$(".random-collage .rc-slide .item-wrap-image").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();				
				});
			
			}
		}
		
		if( $('.has-hover-image').length > 0 ){
			
			var parent_row = $('.has-hover-image').closest('.content-row');
			parent_row.css("z-index", "10");
			
			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{renderByPixels: true,damping:0.1});
			}
			
			const getMousePos = (e) => {
				let posx = 0;
				let posy = 0;
				if (!e) e = window.event;
				if (e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				return { x : posx, y : posy }
			}
		
			// Effect 1
			class HoverImgFx1 {
				constructor(el) {
					this.DOM = {el: el};
					this.DOM.reveal = document.createElement('div');
					this.DOM.reveal.className = 'hover-reveal';
					this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
					this.DOM.el.appendChild(this.DOM.reveal);
					this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
					this.DOM.revealInner.style.overflow = 'hidden';
					this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
		
					this.initEvents();
				}
				initEvents() {
					
					this.positionElement = (ev) => {
						const mousePos = getMousePos(ev);
						if ($("body").hasClass("smooth-scroll")) {
							const docScrolls = {
								left : document.body.scrollLeft + document.documentElement.scrollLeft, 
								top : - scrollbar.scrollTop
							};
							
							gsap.to($('.hover-reveal'), { duration: 0.7, top: `${mousePos.y-(this.DOM.el.querySelector('.hover-reveal').offsetHeight*0.5)-docScrolls.top}px`, left: `${mousePos.x-(this.DOM.el.querySelector('.hover-reveal').offsetWidth*0.5)-docScrolls.left}px`, ease:Power4.easeOut });
						} else {
							const docScrolls = {
								left : document.body.scrollLeft + document.documentElement.scrollLeft, 
								top : document.body.scrollTop + document.documentElement.scrollTop
							};
							gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
						}
						
					};
					this.mouseenterFn = (ev) => {
						this.positionElement(ev);
						this.showImage();
					};
					this.mousemoveFn = ev => requestAnimationFrame(() => {
						this.positionElement(ev);
					});
					this.mouseleaveFn = () => {
						this.hideImage();
					};
					
					this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
					this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
					this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
				}
				showImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);
		
					this.tl = new TimelineMax({
						onStart: () => {
							this.DOM.reveal.style.opacity = 1;
							TweenMax.set(this.DOM.el, {zIndex: 1000});
						}
					})
					.add('begin')
					.add(new TweenMax(this.DOM.revealInner, 0.3, {
						ease: Sine.easeOut,
						startAt: {x: '-100%'},
						x: '0%'
					}), 'begin')
					.add(new TweenMax(this.DOM.revealImg, 0.3, {
						ease: Sine.easeOut,
						startAt: {x: '100%'},
						x: '0%'
					}), 'begin');
				}
				hideImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);
		
					this.tl = new TimelineMax({
						onStart: () => {
							TweenMax.set(this.DOM.el, {zIndex: 999});
						},
						onComplete: () => {
							TweenMax.set(this.DOM.el, {zIndex: ''});
							TweenMax.set(this.DOM.reveal, {opacity: 0});
						}
					})
					.add('begin')
					.add(new TweenMax(this.DOM.revealInner, 0.3, {
						ease: Sine.easeOut,
						x: '100%'
					}), 'begin')
					
					.add(new TweenMax(this.DOM.revealImg, 0.3, {
						ease: Sine.easeOut,
						x: '-100%'
					}), 'begin');
				}
			}
			
			Array.from(document.querySelectorAll('.has-hover-image')).forEach(link => new HoverImgFx1(link));
		
		}
	
	}//End Shortcodes
	

	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	window.Sliders = function() { 
			
		if( $('.content-slider').length > 0 ){
				
			slider = new ClapatSlider('.content-slider', { 
				direction: 'horizontal', 
				snap: true,
				mousewheel: false,
				renderBullet: function (index, className) {
						return '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"'+ 'stroke-opacity="1" stroke-width="2px"></circle>' + '<circle class="solid-fill" cx="10" cy="10" r="3" fill="#FFF"></circle>' + '</svg></div></div>';
				},
			});
			
			$(".slider-button-prev").mouseenter(function(e) {
				if ($(this).parents(".clapat-slider-wrapper").hasClass("light-cursor")) {
					$("body").addClass("drag-cursor-white");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
				} else if ($(this).parents(".clapat-slider-wrapper").hasClass("dark-cursor")) {
					$("body").addClass("drag-cursor-black");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
				}	
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
			}).mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
				$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
			});
			
			$(".slider-button-next").mouseenter(function(e) {	
				if ($(this).parents(".clapat-slider-wrapper").hasClass("light-cursor")) {
					$("body").addClass("drag-cursor-white");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
				} else if ($(this).parents(".clapat-slider-wrapper").hasClass("dark-cursor")) {
					$("body").addClass("drag-cursor-black");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
				}	
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
			}).mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
				$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
			});
			
			$('.content-slider.looped-carousel .clapat-slider, .content-slider.small-looped-carousel .clapat-slider').on('mouseenter mousemove', function() {	
				$("body" ).addClass("scale-drag-x");
				if ($(this).parent().hasClass("light-cursor")) {
					$("body").addClass("drag-cursor-white");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
				} else if ($(this).parent().hasClass("dark-cursor")) {
					$("body").addClass("drag-cursor-black");
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
				}
			}).on('mouseleave', function() {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
			});
			
			
			imagesLoaded('body', function() {
				setTimeout(function() {	
					if( slider != null ){
	  					slider.update();
 					}
				}, 1000);
			});
			
		}
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	window.JustifiedGrid = function() {
		
		if( $('.justified-grid').length > 0 ){
		
			$('.justified-grid').justifiedGallery({
				rowHeight : 360,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	window.Lightbox = function() {
		
		// Image Popup
		const items = gsap.utils.toArray(".image-link");
		
		let sourceItem = null; // keeps track of which item is the source (clicked to open)
		let activeItem = null; // keeps track of which item is opened (details)
		
		// Add click listeners
		function showDetails(item) {
			
			if (sourceItem) { // someone could click on an element behind the open details panel in which case we should just ignore it.
			
				return;
			}
			
			event.preventDefault();
			
			$('body').prepend(`<div class="clapat-img-popup">
				<div class="clapat-img-popup-bg-close"></div>				
				<div class="clapat-img-popup-viewport">
					<div class="clapat-img-popup-preloader"><div></div><div></div><div></div><div></div></div>					
					<img />
					<div class="clapat-img-popup-close link"></div>						
				</div>				
				<div class="clapat-img-popup-prev link"></div>
				<div class="clapat-img-popup-next link"></div></div>`);
			
			const details = document.querySelector('.clapat-img-popup');
			const detailsBgClose = document.querySelector('.clapat-img-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-img-popup-close');
			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			const detailPrev = document.querySelector('.clapat-img-popup-prev');
			const detailNext = document.querySelector('.clapat-img-popup-next');
			
			gsap.to(detailsBgClose, {duration: 0.3, delay:0, backgroundColor:"rgba(0,0,0,0.9)"});
			gsap.to(detailsPreloader, {duration: 0.2, opacity:1});
			gsap.set(detailImage, {opacity:0});
			
			$(".link, .button").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 4, left: 4});
			});
						
			$(".link, .button").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			});
			
			let onLoad = () => {
				gsap.to(detailsPreloader, {duration: 0.2, opacity:0});
				gsap.set(detailImage, {opacity:1});
				// position the details on top of the item (scaled down)
				Flip.fit(details, item, {scale: true, fitChild: detailImage});

				// record the state				
				const state = Flip.getState(detailImage);

				// set the final state
				gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
				
				gsap.to([detailsClose, detailPrev, detailNext], {duration: 0.3, delay:0.6, opacity:1});

				Flip.from(state, {
					delay:0.2,
					duration: 0.5,
					ease: "power2.inOut",
					scale: true,					
				})

				detailImage.removeEventListener("load", onLoad);
				detailsBgClose.addEventListener('click', hideDetails);
				detailsClose.addEventListener('click', hideDetails);
				detailPrev.addEventListener('click', prevPopup);
				detailNext.addEventListener('click', nextPopup);
			};

			// change image
			detailImage.addEventListener("load", onLoad);
			detailImage.src = item.getAttribute('href');
						
			// set the source item that was clicked
			sourceItem = activeItem = item;
		}

		function hideDetails() {
			
			const details = document.querySelector('.clapat-img-popup');
			const detailsBgClose = document.querySelector('.clapat-img-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-img-popup-close');
			const detailImage = document.querySelector('.clapat-img-popup img');
			const detailPrev = document.querySelector('.clapat-img-popup-prev');
			const detailNext = document.querySelector('.clapat-img-popup-next');
			
			detailsBgClose.removeEventListener('click', hideDetails);
			detailsClose.removeEventListener('click', hideDetails);
			gsap.set(details, {overflow: "hidden"});

			// record the current state of details
			const state = Flip.getState(detailImage);

			// scale details down so that its detailImage fits exactly on top of sourceItem
			Flip.fit(detailImage, sourceItem, {scale: true, fitChild: detailImage});

			
			
			gsap.to([detailsClose, detailPrev, detailNext], {duration: 0.2, delay:0, opacity:0});

			// animate from the original state to the current one.
			Flip.from(state, {
				scale: true,
				duration: 0.5,
				delay: 0.0, // time in ms if we want a delay before flip
				onComplete: () => gsap.to(detailsBgClose, {duration: 0.5, backgroundColor:"rgba(0,0,0,0)", onComplete: function() {
					$('.clapat-img-popup').remove();
				}}),				
			});

			sourceItem = activeItem = null;	
		}
		
		function nextPopup() {
			
			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			let currIndex = items.indexOf(activeItem);
			
			let nextIndex = currIndex + 1;
			if( nextIndex >= items.length ){ nextIndex = 0; }
			
			gsap.to(detailsPreloader, {duration: 0.2, opacity:1});
			gsap.to(detailImage, {duration: 0.2, opacity:0});
			
			let onLoad = () => {
				gsap.to(detailsPreloader, {duration: 0.2, opacity:0});
				gsap.to(detailImage, {duration: 0.2, opacity:1, delay:0});
				detailImage.removeEventListener("load", onLoad);
			}
			
			sourceItem = activeItem = items[nextIndex];
			detailImage.addEventListener("load", onLoad);
			detailImage.src = activeItem.getAttribute('href');
		}
		
		function prevPopup() {
			
			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			let currIndex = items.indexOf(activeItem);
			
			let prevIndex = currIndex - 1;
			if( prevIndex < 0 ){ prevIndex = items.length - 1; }
			
			gsap.to(detailsPreloader, {duration: 0.2, opacity:1});
			gsap.to(detailImage, {duration: 0.2, opacity:0});
			
			let onLoad = () => {
				gsap.to(detailsPreloader, {duration: 0.2, opacity:0});
				gsap.to(detailImage, {duration: 0.2, opacity:1});
				detailImage.removeEventListener("load", onLoad);
			}
			
			sourceItem = activeItem = items[prevIndex];
			detailImage.addEventListener("load", onLoad);
			detailImage.src = activeItem.getAttribute('href');
		}
		
		gsap.utils.toArray('.image-link').forEach(item => item.addEventListener('click', () => showDetails(item)));
		
		$(".image-link").mouseenter(function(e) {	
			gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa-solid fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		// Video Popup
		const videoItems = gsap.utils.toArray(".video-link");
		
		let sourceVideoItem = null; // keeps track of which item is opened (details)
		
		// Add click listeners
		function showVideoDetails(event, item) {
			
			event.preventDefault();
			
			if (sourceVideoItem) { // someone could click on an element behind the open details panel in which case we should just ignore it.
			
				return;
			}
			
			$('body').prepend(`<div class="clapat-video-popup">
				<div class="clapat-video-popup-bg-close"></div>				
				<div class="clapat-video-popup-viewport">
					<div class="clapat-video-popup-preloader"><div></div><div></div><div></div><div></div></div>					
					<iframe class="clapat-video-popup-iframe" frameborder="0" allow="autoplay"></iframe>
					<div class="clapat-video-popup-close link"></div>						
				</div>				
				<div class="clapat-img-video-prev link"></div>
				<div class="clapat-img-video-next link"></div></div>`);
			
			const details = document.querySelector('.clapat-video-popup');
			const detailsBgClose = document.querySelector('.clapat-video-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-video-popup-close');
			const detailsPreloader = document.querySelector('.clapat-video-popup-preloader');
			const detailIframe = document.querySelector('.clapat-video-popup iframe');
			
			gsap.to(detailsBgClose, {duration: 0.3, delay:0, backgroundColor:"rgba(0,0,0,0.9)"});
			gsap.to(detailsPreloader, {duration: 0.2, opacity:1});
			gsap.set(detailIframe, {opacity:0});
			
			$(".link, .button").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 4, left: 4});
			});
						
			$(".link, .button").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			});
			
			let onVideoLoad = () => {
				gsap.to(detailsPreloader, {duration: 0.2, opacity:0, onComplete: function() {
					gsap.to(detailIframe, {duration: 0.3, delay:0, opacity:1});
				}});
				console.log('Popup Video is ready to play.');
			}
			
			// load the video
			detailIframe.addEventListener("load", onVideoLoad);
			let videoUrl = item.getAttribute('href');
			if( videoUrl.indexOf('vimeo.com/') >= 0 ){
				
				// this is a vimeo url, extract the video id from it
				let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
				let parseUrl = regExp.exec(videoUrl);
				let videoId = parseUrl[5];
				detailIframe.src = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1';
			}
			else if( videoUrl.indexOf('youtube.com/') >= 0 ){
				
				// this is a youtube url, extract the video id from it
				let videoId = videoUrl.split('v=')[1];
				let ampersandPosition = videoId.indexOf('&');
				if(ampersandPosition != -1) {
					
					videoId = videoId.substring(0, ampersandPosition);
				}
				detailIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
			}
			else{
				
				// give it a try anyway
				detailIframe.src = item.getAttribute('href');
			}
			
			// assign the current item
			sourceVideoItem = item;

			// set the final state
			gsap.set(details, {clearProps: true}); 			
			gsap.to([detailsClose], {duration: 0.3, delay:0.6, opacity:1});
						
			detailsBgClose.addEventListener('click', hideVideoDetails);
			detailsClose.addEventListener('click', hideVideoDetails);
			
		}

		function hideVideoDetails() {
			
			const details = document.querySelector('.clapat-video-popup');
			const detailsBgClose = document.querySelector('.clapat-video-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-video-popup-close');
			const detailIframe = document.querySelector('.clapat-video-popup iframe');
			
			detailsBgClose.removeEventListener('click', hideDetails);
			detailsClose.removeEventListener('click', hideDetails);
						
			gsap.to([detailsClose, detailIframe], {duration: 0.2, delay:0, opacity:0});
						
			gsap.to(detailsBgClose, {duration: 0.5, delay:0.2, backgroundColor:"rgba(0,0,0,0)", onComplete: function() {
					$('.clapat-video-popup').remove();
				}}),

			sourceVideoItem = null;
	
		}

		gsap.utils.toArray('.video-link').forEach(item => item.addEventListener('click', (e) => showVideoDetails(e, item)));
		
		$(".video-link").mouseenter(function(e) {	
			gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa-solid fa-play"></i>' );
		});
			
		$(".video-link").mouseleave(function(e) {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	


	
/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/	
	
	window.PlayVideo = function() {
	
		if( $('.video-wrapper').length > 0 ){
			
			
			$(".video-wrapper").mouseenter(function(e) {
				if ($(this).hasClass("play")) {
					$( "#ball" ).addClass("pause-movie")		
				}
				gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});
			
			$(".video-wrapper").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("#ball").removeClass("over-movie").removeClass("pause-movie");
				$('#ball i').remove();
			});
			
			$(".video-wrapper .control").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth: '20px', scale: 0});
			});
			
			$(".video-wrapper .control").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			});
			
			var videocenter = ($(window).height() - $('.video-cover').height()) / 2
			
			var playpause = function( videoObj ) {
				
				if( videoObj[0] != null ){
					if(videoObj[0].paused || videoObj[0].ended) {
						
						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {
						
						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};
			
			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};
			
			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function() {
				
				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);		
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');
				
				$( "#ball" ).toggleClass("pause-movie");
				
				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function() {
					
					if( !current_wrapper.is( $(this) ) ){
						
						$(this).removeClass('play');
						$(this).find('video').each(function() {
							
							if( !$(this).get(0).paused && !$(this).get(0).ended ) {
								
								$(this).get(0).pause();
							}
						});
					}
					
				});
				
				// trigger the click for the inner video
				$(this).find('video').each(function() {

					playpause( $(this) );
				});

			});
			
			//fullscreen button clicked
			$('.btnFS').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				if($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}	
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}

				
				// prevent video wrapper div responding the event
				e.stopPropagation();
				
			});
				
			//sound button clicked
			$('.sound').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if(video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width',0);
				}
				else{
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume*100+'%');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			//progress bar (video timebar) clicked
			$('.progress').on('click', function( e ) {
				
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
									
				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration 	= video_object[0].duration;
				var position 			= e.pageX - $(this).offset().left;
				var percentage 	= 100 * position / $(this).width();
				if(percentage > 100) {
					
					percentage = 100;
				}
				if(percentage < 0) {
					
					percentage = 0;
				}
				$('.timeBar').css('width', percentage+'%');	
				video_object[0].currentTime = maxduration * percentage / 100;
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			$('#main-page-content').find('video').each(function() {
			
				var video = $(this);
				var video_wrapper = $(this).parent();
				
				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);
			 
				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function() {
					
					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));
					
				});
				
				//display current video buffered progress
				video.on('progress', function() {
					
					var video_object 		= $(this);
					var parent_wrapper 	= $(this).parent();
					var maxduration 		= video_object [0].duration;
					
					if (maxduration > 0) {
					  for (var i = 0; i < video_object [0].buffered.length; i++) {
							if (video_object [0].buffered.start(video_object [0].buffered.length - 1 - i) <video_object [0].currentTime) {
								var perc = (video_object [0].buffered.end(video_object [0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width',perc+'%');
								break;
							}
						}
					}
					
				});
				
				//display current video play time
				video.on('timeupdate', function() {
					
					var parent_wrapper 	= $(this).parent();
					var currentPos 			= $(this).get(0).currentTime;
					var maxduration 		= $(this).get(0).duration;
					var perc 					= 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width',perc+'%');	
					parent_wrapper.find('.current').text(timeFormat(currentPos));	
				});
				
				//video screen and play button clicked
				video.on('click', function() { 
					
					playpause( $(this) ); 
				});
				
				//video canplay event
				video.on('canplay', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});
				
				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function() {
					
					completeloaded = true;
				});
				
				//video ended event
				video.on('ended', function() {		
					
					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$( "#ball" ).toggleClass("pause-movie");
				});
			
				//video seeking event
				video.on('seeking', function() {
					
					//if video fully loaded, ignore loading screen
					if(!completeloaded) { 
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}	
				});
				
				//video seeked event
				video.on('seeked', function() { });
				
				//video waiting for more data event
				video.on('waiting', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});
				
			});
			
		}
		
	}// End PlayVideo

	window.isMobile = function() {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			$('body').addClass("disable-cursor");
			return true
			
		}
		else {
			if ($(window).width() <= 1024) {
				$('body').addClass("disable-cursor");
				return true 
			}		
		};
		return false
	};
	

	
/*--------------------------------------------------
Function Core
---------------------------------------------------*/

	window.Core = function() {
		
		if (!isMobile() && !$('body').hasClass("disable-cursor")) {
			var mouse = { x: 0, y: 0 };
			var pos = { x: 0, y: 0 };
			var ratio = 0.65;			
			var active = false;			
			var ball = document.getElementById("ball");
			var ballloader = document.getElementById("ball-loader");
			var offsetX = 40;
			
			
			gsap.set(ball, { xPercent: -50, yPercent: -50, scale:0.5, borderWidth: '4px' });
			
			document.addEventListener("mousemove", mouseMove);
			
			function mouseMove(e) {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				mouse.x = e.pageX;
				mouse.y = e.pageY - scrollTop;

			}
			
			gsap.ticker.add(updatePosition);
			
			function updatePosition() {
				if (!active) {
					pos.x += (mouse.x - pos.x) * ratio;
					pos.y += (mouse.y - pos.y) * ratio;
			
					gsap.to(ball, { duration: 0.4, x: pos.x, y: pos.y });
				}
			}
			
			$(".sticky.left").mouseenter(function(e) {
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.left - offsetX;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
				gsap.ticker.remove(updatePosition);
			})
			
			$(".sticky.right").mouseenter(function(e) {
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.right + offsetX;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
				gsap.ticker.remove(updatePosition);
			})
			
			$("#main .sticky.left").mouseenter(function(e) {		  
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.left - offsetX + 10;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
				gsap.ticker.remove(updatePosition);
			})
			
			$("#main .sticky.right").mouseenter(function(e) {		  
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.right + offsetX - 10;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
				gsap.ticker.remove(updatePosition);
			})
			
			$(".clapat-button .sticky.left").mouseenter(function(e) {		  
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.left  + 22;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.4, opacity:1, borderWidth: '6px', borderColor:'#000'});
				gsap.ticker.remove(updatePosition);
			})
			
			$(".clapat-button .sticky.right").mouseenter(function(e) {		  
				var rcBounds = $(this)[0].getBoundingClientRect();		  
				var positionX = rcBounds.right  - 22;
				var positionY = rcBounds.top + rcBounds.height/2;		  
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.4, opacity:1, borderWidth: '6px', borderColor:'#000'});
				gsap.ticker.remove(updatePosition);
			})
			
			$(".sticky").mouseleave(function(e) {			
				gsap.to(ball, { duration: 0.2, scale:0.5, borderWidth: '4px', borderColor:'#999999', opacity:1 });
				gsap.ticker.add(updatePosition);		  
			})	
			
			$(".parallax-wrap").mouseenter(function(e) {
				gsap.to(this, { duration: 0.3, scale: 2 });
				gsap.to(ball, { duration: 0.3, scale: 0.9, borderWidth: '2px',opacity:1 });
				gsap.to($( this ).children(), {duration: 0.3, scale:0.5});
				active = true;
			});
			
			$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.3, scale: 0.7, borderWidth: '6px', opacity:0.6, borderColor:'#999' });
			});
			
			$(".clapat-button .parallax-wrap.icon-wrap").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity:1, borderColor:'#000' });
			});
			
			$(".parallax-wrap.bigger").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.3, scale: 1.35, borderWidth: '2px', opacity:1 });
			});
			
			$(".parallax-wrap").mouseleave(function(e) {
				gsap.to(this, { duration: 0.3, scale: 1 });
				gsap.to(ball, { duration: 0.3, scale: 0.5, borderWidth: '4px', opacity:1, borderColor:'#999999'  });
				gsap.to($( this ).children(), {duration: 0.3, scale:1, x: 0, y:0});
				active = false;
			});		
			
			
			$(".sticky").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.5, borderColor:$("body").data('primary-color') });
			});
			$("#main .sticky").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.5, borderColor:'#999' });
			});
			$(".clapat-button .sticky").mouseenter(function(e) {
				if ($('#clapat-page-content').hasClass("light-content")) {
					gsap.to(ball, { duration: 0.5, borderColor:'#000' });
				} else {
					gsap.to(ball, { duration: 0.5, borderColor:'#fff' });  
				}
			});
			$(".parallax-wrap").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.3, borderColor:$("body").data('primary-color')  });
			});
			$(".clapat-button .parallax-wrap").mouseenter(function(e) {
				if ($('#clapat-page-content').hasClass("light-content")) {
					gsap.to(ball, { duration: 0.05, borderColor:'#000'  });
				} else {
					gsap.to(ball, { duration: 0.05, borderColor:'#fff'  });
				}
			});
			$(".parallax-wrap.bigger").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.3, borderColor:$("body").data('primary-color')  });
			});
			$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
				gsap.to(ball, { duration: 0.3, borderColor:'#999'});
			});			 
			
			$(".parallax-wrap").mousemove(function(e) {
				parallaxCursor(e, this, 2);
				callParallax(e, this);
			});
			
			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
			}
			
			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.pageX - boundingRect.left;
				var relY = e.pageY - boundingRect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				
				gsap.to(target, {
					duration: 0.3,
					x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
					y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
					ease: Power2.easeOut
				});
			}
			
			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.pageX - rect.left;
				var relY = e.pageY - rect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				pos.y = rect.top + rect.height / 2  + (relY - rect.height / 2 - scrollTop)  / movement ;
				gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
			}
			
			$(".hide-ball").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth: '1px', scale: 1, opacity:0});
			});	
					
			$(".hide-ball").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, opacity:1});
			});
			
			$(".link, .button").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 4, left: 4});
			});	
					
			$(".link, .button").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			});
			
			//Blog Hover Effects			
			$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function(e) {	
				gsap.to('#ball', {duration: 0.2, borderWidth: '1px', scale: 1, opacity:0});
			});	
					
			$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, opacity:1});
			});
		}
		
		if ($('body').hasClass("disable-ajaxload")) {
			return 
		}
		
		jQuery(document).ready(function(){
			  var isAnimating = false,
				newLocation = '';
				firstLoad = false;
			  
			  //trigger smooth transition from the actual page to the new one 
			  $('main').on('click', '[data-type="page-transition"]', function(event){
				event.preventDefault();
				//detect which page has been selected
				var newPage = $(this).attr('href');
				//if the page is not already being animated - trigger animation
				if( !isAnimating ) changePage(newPage, true);
				firstLoad = true;
			  });
			
			  //detect the 'popstate' event - e.g. user clicking the back button
			  $(window).on('popstate', function() {
				if( firstLoad ) {

				  /*
				  Safari emits a popstate event on page load - check if firstLoad is true before animating
				  if it's false - the page has just been loaded
				  */
				  var newPage = location.href;

				  if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
				}
				firstLoad = true;
				});
			
				function changePage(url, bool) {
				isAnimating = true;
				// trigger page animation
				$('body').addClass('page-is-changing');
				$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					loadNewContent(url, bool);
				  newLocation = url;
				  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
				//if browser doesn't support CSS transitions
				if( !transitionsSupported() ) {
				  loadNewContent(url, bool);
				  newLocation = url;
				}
				}
			
				function loadNewContent(url, bool) {
					url = ('' == url) ? 'index.html' : url;
				
				var section = $('<div class="cd-main-content "></div>');
						
					
				section.load(url+' .cd-main-content > *', function(event){
				  // load new content and replace <main> content with the new one
				  
				  	$('main').html(section);
				  
				 	var clapat_title = event.match(/<title[^>]*>([^<]+)<\/title>/)[1];
					$('head title').html( clapat_title );

					// Announce the page change to screen-reader users. The
					// AJAX page-transition system swaps <main> content
					// without a real navigation/history event a screen
					// reader would otherwise announce on its own, so it was
					// previously silent about page changes entirely.
					if ($('#a11y-route-announcer').length === 0) {
						$('body').append('<div id="a11y-route-announcer" role="status" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"></div>');
					}
					$('#a11y-route-announcer').text('Navigated to ' + clapat_title);

					// if we have Elementor inline styles in the target page
					headTags = [
								'style[id*=elementor-frontend-inline]',
								'style[id*="elementor-post"]',
								'link[id*="elementor-post"]',
								'link[id*="google-fonts"]',
							];
					var head = document.head;
					var newPageRawHead = event.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
					newPageHead = document.createElement('head');
					
					newPageHead.innerHTML = newPageRawHead;

					var oldHeadTags = head.querySelectorAll(headTags);
					var newHeadTags = newPageHead.querySelectorAll(headTags);
					
					// append new and remove old tags
					for (let i = 0; i < newHeadTags.length; i++) {
						if (typeof oldHeadTags[i] !== 'undefined') {
							head.insertBefore(newHeadTags[i], oldHeadTags[i].nextElementSibling);
							head.removeChild(oldHeadTags[i]);
						} else {
							head.insertBefore(newHeadTags[i], newHeadTags[i - 1]);
						}
					}
					
					$('html, body').scrollTop(0);
				  
				  //if browser doesn't support CSS transitions - dont wait for the end of transitions
				  var delay = ( transitionsSupported() ) ? 30 : 0;
				  setTimeout(function(){
					//wait for the end of the transition on the loading bar before revealing the new content				
					$('body').removeClass('page-is-changing');
					$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					  isAnimating = false;
					  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
					})
				
				
				LoadViaAjax();
				
				if (!isMobile() && !$('body').hasClass("disable-cursor")) {
					$(".sticky.left").mouseenter(function(e) {
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.left - offsetX;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
						gsap.ticker.remove(updatePosition);
					})
					
					$(".sticky.right").mouseenter(function(e) {
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.right + offsetX;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px'});
						gsap.ticker.remove(updatePosition);
					})
					
					$("#main .sticky.left").mouseenter(function(e) {		  
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.left - offsetX + 10;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
						gsap.ticker.remove(updatePosition);
					})
					
					$("#main .sticky.right").mouseenter(function(e) {		  
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.right + offsetX - 10;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.7, opacity:0.6, borderWidth: '6px', borderColor:'#999999'});
						gsap.ticker.remove(updatePosition);
					})
					
					$(".clapat-button .sticky.left").mouseenter(function(e) {		  
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.left  + 22;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.4, opacity:1, borderWidth: '6px', borderColor:'#000'});
						gsap.ticker.remove(updatePosition);
					})
					
					$(".clapat-button .sticky.right").mouseenter(function(e) {		  
						var rcBounds = $(this)[0].getBoundingClientRect();		  
						var positionX = rcBounds.right  - 22;
						var positionY = rcBounds.top + rcBounds.height/2;		  
						gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale:0.4, opacity:1, borderWidth: '6px', borderColor:'#999999'});
						gsap.ticker.remove(updatePosition);
					})
					
					$(".sticky").mouseleave(function(e) {			
						gsap.to(ball, { duration: 0.2, scale:0.5, borderWidth: '4px', borderColor:'#999999', opacity:1 });
						gsap.ticker.add(updatePosition);		  
					})	
					
					$(".parallax-wrap").mouseenter(function(e) {
						gsap.to(this, { duration: 0.3, scale: 2 });
						gsap.to(ball, { duration: 0.3, scale: 0.9, borderWidth: '2px',opacity:1 });
						gsap.to($( this ).children(), {duration: 0.3, scale:0.5});
						active = true;
					});
					
					$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.3, scale: 0.7, borderWidth: '6px', opacity:0.6, borderColor:'#999' });
					});
					
					$(".clapat-button .parallax-wrap.icon-wrap").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity:1, borderColor:'#000' });
					});
					
					$(".parallax-wrap.bigger").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.3, scale: 1.35, borderWidth: '2px', opacity:1 });
					});
					
					$(".parallax-wrap").mouseleave(function(e) {
						gsap.to(this, { duration: 0.3, scale: 1 });
						gsap.to(ball, { duration: 0.3, scale: 0.5, borderWidth: '4px', opacity:1, borderColor:'#999999'  });
						gsap.to($( this ).children(), {duration: 0.3, scale:1, x: 0, y:0});
						active = false;
					});		
					
					$(".sticky").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.5, borderColor:$("body").data('primary-color') });
					});
					$("#main .sticky").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.5, borderColor:'#999' });
					});
					$(".clapat-button .sticky").mouseenter(function(e) {
						if ($('#clapat-page-content').hasClass("light-content")) {
							gsap.to(ball, { duration: 0.5, borderColor:'#000' });
						} else {
							gsap.to(ball, { duration: 0.5, borderColor:'#fff' });  
						}
					});
					$(".parallax-wrap").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.3, borderColor:$("body").data('primary-color')  });
					});
					$(".clapat-button .parallax-wrap").mouseenter(function(e) {
						if ($('#clapat-page-content').hasClass("light-content")) {
							gsap.to(ball, { duration: 0.05, borderColor:'#000'  });
						} else {
							gsap.to(ball, { duration: 0.05, borderColor:'#fff'  });
						}
					});
					$(".parallax-wrap.bigger").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.3, borderColor:$("body").data('primary-color')  });
					});
					$("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
						gsap.to(ball, { duration: 0.3, borderColor:'#999'});
					});
					
					$(".parallax-wrap").mousemove(function(e) {
						parallaxCursor(e, this, 2);
						callParallax(e, this);
					});
					
					function callParallax(e, parent) {
						parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
					}
					
					function parallaxIt(e, parent, target, movement) {
						var boundingRect = parent.getBoundingClientRect();
						var relX = e.pageX - boundingRect.left;
						var relY = e.pageY - boundingRect.top;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						
						gsap.to(target, {
							duration: 0.3,
							x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
							y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
							ease: Power2.easeOut
						});
					}
					
					function parallaxCursor(e, parent, movement) {
						var rect = parent.getBoundingClientRect();
						var relX = e.pageX - rect.left;
						var relY = e.pageY - rect.top;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
						pos.y = rect.top + rect.height / 2  + (relY - rect.height / 2 - scrollTop)  / movement ;
						gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
					}
					
					$(".hide-ball").mouseenter(function(e) {	
						gsap.to('#ball', {duration: 0.2, borderWidth: '1px', scale: 1, opacity:0});
					});	
							
					$(".hide-ball").mouseleave(function(e) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, opacity:1});
					});
					
					$(".link, .button").mouseenter(function(e) {	
						gsap.to('#ball', {duration: 0.2, borderWidth:"0px",scale:1.5,backgroundColor:"rgba(153, 153, 153, 1)",opacity:0.15});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 4, left: 4});
					});
								
					$(".link, .button").mouseleave(function(e) {
						gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(153, 153, 153, 0)",opacity:1});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					});
					
					//Blog Hover Effects			
					$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function(e) {	
						gsap.to('#ball', {duration: 0.2, borderWidth: '1px', scale: 1, opacity:0});
					});	
							
					$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function(e) {
						gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, opacity:1});
					});
				}
				
				
				
				
				if( !transitionsSupported() ) isAnimating = false;
				  }, delay);			  
				  if(url!=window.location && bool){
					window.history.pushState({path: url},'',url);
				  }
					});
			  }
			
			  function transitionsSupported() {
				return $('html').hasClass('csstransitions');
			  }
			});
			
		
	}// End Core
	
	
});
	
	// Export functions to scripts
	var ScrollEffects = window.ScrollEffects;
	var FitThumbScreenWEBGL = window.FitThumbScreenWEBGL;
	var FitThumbScreenGSAP = window.FitThumbScreenGSAP;
	var Shortcodes = window.Shortcodes;
	var Sliders = window.Sliders;
	var JustifiedGrid = window.JustifiedGrid;
	var Lightbox = window.Lightbox;
	var PlayVideo = window.PlayVideo;
	var isMobile = window.isMobile;
	var Core = window.Core;	