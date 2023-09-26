export default function validate(newDog, allDogsCopy){
    let errors={}

    //Validaciones regex
    const numEnteroPositivo=/^[1-9]\d*$/;
    const noNumeros=/^[^\d]*$/;
    const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    //Errores en nombre
    if(!newDog.name){
        errors.name="Name is required."
    }else if(!noNumeros.test(newDog.name)){
        errors.name="The name must not contain numbers."
    }
    // }else if (allDogsCopy.find(dog => dog.name === newDog.name)) {
    //         errors.name = "Name already exists.";
    // }
    else errors.name=null

    //Errores en image
    if(!newDog.image){
        errors.image="image url is required."
    }else if(isUrl.test(newDog.image)){
        errors.image="the field only accepts url"
    }else errors.name=null

    //Errores en weight
    if(!newDog.min_weight){
        errors.min_weight="Weight min is required."
    }else if(!numEnteroPositivo.test(newDog.min_weight)){
        errors.min_weight="Weight min must be a number."
    }else errors.min_weight=null

    if(!newDog.max_weight){
        errors.max_weight="Weight max is required."
    }else if(!numEnteroPositivo.test(newDog.max_weight)){
        errors.max_weight="Weight max must be a number."
    }else {
        //Para comparar min y max primero los transformo a number
        const weightMin = parseInt(newDog.min_weight);
        const weightMax = parseInt(newDog.max_weight);

        if (weightMin && weightMax < weightMin) {
            errors.max_weight = "Weight max must be greater than the Weight min.";
        }else if(newDog.max_weight>110){
            errors.max_weight="Weight max must be less than 110kg."
        }else errors.max_weight=null
    }

    //Errores en height
    if(!newDog.min_height){
        errors.min_height="Height min is required."
    }else if(!numEnteroPositivo.test(newDog.min_height)){
        errors.min_height="Height min must be a number."
    }else errors.min_height=null

    if(!newDog.max_height){
        errors.max_height="Height max is required."
    }else if(!numEnteroPositivo.test(newDog.max_height)){
        errors.max_height="Height max must be a number."
    }else {
        const heightMin = parseInt(newDog.min_height);
        const heightMax = parseInt(newDog.max_height);
        if (heightMin && heightMax < heightMin) {
            errors.max_height = "Height max must be greater than the Height min.";
        }else if(newDog.max_height>120){
            errors.max_height="Height max must be less than 120cm."
        }else errors.max_height=null
    }

    // errores en lifeSpan
    if(!newDog.min_lifeSpan){
        errors.min_lifeSpan="life Span is required."
    }else if(!numEnteroPositivo.test(newDog.min_lifeSpan)){
        errors.min_lifeSpan="life Span is required."
    }else errors.min_lifeSpan=null

    if(!newDog.max_lifeSpan){
        errors.max_lifeSpan="life span is required."
    }else if(!numEnteroPositivo.test(newDog.max_lifeSpan)){
        errors.max_lifeSpan="life span required number."
    }else {
        const lifeSpanMin = parseInt(newDog.min_lifeSpan);
        const lifeSpanMax = parseInt(newDog.max_lifeSpan);
        if (lifeSpanMin && lifeSpanMax < lifeSpanMin) {
            errors.max_lifeSpan = "life span max must be greater than the Height min.";
        }else if(newDog.max_lifeSpan>120){
            errors.max_lifeSpan="life span max must be less than 120cm."
        }else errors.max_lifeSpan=null
    }

    // //errores en temperaments
    // if(!newDog.temperaments){
    //     errors.temperaments ='Select the least one temperament for your dog';
    // }else errors.temperaments=null

    return errors
}