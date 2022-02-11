export default function cardTemplate(element) {
  return `<li id='${element.id}' class='gallery-item'>
    <div class='gallery-item-img'>
      <img class='loading' src=${element.img} alt=${element.name} width='150' height='150' />
    </div>      
    <p class='gallery-item-name'>
      Name: ${element.name}
    </p>       
  </li>`;
}
