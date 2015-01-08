ProgressBar =function( eProgressBar, nTotal ){
	var e = this.eRoot = document.createElement('DIV')
	e.className = 'progressBar'
	e.appendChild( document.createElement('DIV'))
	eProgressBar.appendChild( e )
	if( nTotal ) this.setTotal( nTotal )
	this.show()
	}
ProgressBar.prototype =(function(){
	var f =function(n){
		n=n<0?0:(n>255?255:parseInt(n))
		if(n==0)return'00'
		n=new Number(n)
		var s=n.toString(16).toUpperCase()
		return(s.length==1?'0':'')+s
		}
	return {
		bColor : 1,
		bInvertedColor : 0,
		bPercentage: 1,
		nValue : 0,
		setTotal :function( nTotal ){
			this.nTotal = nTotal
			return this.reset()
			},
		setValue :function( nValue ){
			this.show()
			var e = this.eRoot.firstChild
			this.nValue = nValue

			var nPercent = parseInt( this.nValue*100/this.nTotal )
			var nPercentLimit = nPercent > 100 ? 100 : nPercent
			if( this.bColor ){
				var n = this.bInvertedColor ? 100-nPercentLimit : nPercentLimit
				e.style.backgroundColor = n <= 50
					? '#'+ f(255-(50-n)/1.25) + f(255*(n)/50) +'00'
					: '#'+ f(255*(100-n)/50) + f(255+(-n+50)/1.25) +'00'
				}
			else e.style.backgroundColor = ''
			e.style.width = nPercentLimit +'%'
			e.innerHTML = this.bPercentage ? nPercent +'%' : this.nValue +'/'+ this.nTotal

			if( this.nValue == this.nTotal && ! this.bInvertedColor ) this.hide()
			},
		add :function( nValue ){
			return this.setValue( this.nValue + nValue )
			},
		hide :function(){
			var o = this.eRoot.style
			o.height = o.padding = o.borderWidth = 0
			o.opacity = 0
			return this
			},
		show :function(){
			var o = this.eRoot.style
			o.height = o.padding = o.borderWidth = ''
			o.opacity = 1
			return this
			},
		reset :function(){
			var e = this.eRoot.firstChild
			e.style.backgroundColor = this.bColor ? ( this.bInvertedColor ? '#00D700' : '#D70000' ) : ''
			e.style.width = this.nValue = 0
			e.innerHTML = this.bPercentage ? '0%' : this.nValue +'/'+ this.nTotal
			return this
			}
		}
	})()