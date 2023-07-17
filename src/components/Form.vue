<template>
    <form @submit.prevent="newInvoice">
        <h2>Invoice #{{ randomName }}</h2>
        <section>
            <h4>Bill From</h4>
            <label for="street">Street Adress</label>
            <input type="text" name="street" id="street" v-model="streetAdress">
            <label for="city">city</label>
            <input type="text" name="city" id="city" v-model="city">
            <label for="PostCode">PostCode </label>
            <input type="text" name="PostCode" id="PostCode" v-model="postCode">
            <label for="Country">Country</label>
            <input type="text" name="Country" id="Country" v-model="country">
        </section>
        <section>
            <h4>Bill To</h4>
            <label for="cName">Client's Name</label>
            <input type="text" name="cName" id="cName" v-model="cName">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="email">
            <label for="cStreet">Street Adress</label>
            <input type="text" name="cStreet" id="cStreet" v-model="cStreet">
            <label for="cCity">City </label>
            <input type="text" name="cCity" id="cCity" v-model="cCity">
            <label for="cPostCode">PostCode </label>
            <input type="text" name="cPostCode" id="cPostCode" v-model="cPostCode">
            <label for="cCountry">Country</label>
            <input type="text" name="cCountry" id="cCountry" v-model="cCountry">
            <label for="date">Invoice Date</label>
            <input type="date" name="date" id="date" v-model="date">
            <label for="paymentTerms">paymentTerms</label>

            <select name="paymentTerms" id="paymentTerms" v-model="paymentTerms">
                <option value="30days">Net 30 days</option>
                <option value="60days">Net 60 days</option>
            </select>
            <label for="invoiceStatus">Status</label>
            <select name="invoiceStatus" id="invoiceStatus" v-model="invoiceStatus">
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
            </select>
            <label for="description">Project Description</label>
            <input type="description" name="description" id="description" v-model="description">
        </section>
        <section>
            <h3>Item List</h3>
            <div v-for="item in itemArray" :key="item.id">
                <label for="iName">Item Name</label>
                <input type="text" name="iName" id="iName" v-model="item.itemName">
                <label for="quantity">Qty</label>
                <input type="number" name="quantity" id="quantity" v-model="item.quantity">
                <label for="price">Price</label>
                <input type="number" name="price" id="price" v-model="item.price">
                {{ item.result }}
                <button @click.prevent="removeLine(item.id)">IMG</button>
            </div>
            {{ total }}
            {{ totalItem }}
            <button @click.prevent="addItemLine">+ Add New Item</button>
            <br><br><br><br><br><br>
        </section>
        <button @submit.prevent="newInvoice">Save Changes</button>
    </form>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useInvoiceStore } from '../stores/InvoiceStore'
export default {
    setup() {
        const store = useInvoiceStore();
        const randomName = Math.random().toString(36).substr(2, 9);
        const streetAdress = ref('');
        const city = ref('');
        const postCode = ref('');
        const country = ref('');
        const cName = ref('');
        const email = ref('');
        const cStreet = ref('');
        const cCity = ref('');
        const cPostCode = ref('');
        const cCountry = ref('');
        const date = ref('');
        const paymentTerms = ref('');
        const description = ref('');
        const itemName = ref('');
        const quantity = ref(0);
        const price = ref(0);
        const invoiceStatus = ref('pending');
        const result = ref(0);
        let total = ref(0)

        // Premier item près installé pour indiquer au client que l'on doit renseigner le détail de commande ici
        const itemArray = ref([{
            id: Math.floor(Math.random() * 100), // Génère un ID unique (ceci est juste un exemple)
            itemName: itemName.value,
            quantity: quantity.value,
            price: price.value,
            result: result.value,
        },
        ])
        //--------------------//
        // On rajoute une nouvelle ligne vide qu'on va rajouter au tableau "itemArray" pour permettre 
        // la saisie d'un nouvel article
        const addItemLine = () => {
            const item = {
                id: Math.floor(Math.random() * 100), // Génère un ID unique (ceci est juste un exemple)
                itemName: '',
                quantity: quantity.value,
                price: price.value,
                result: result.value,
                total: totalItem
            };
            itemArray.value.push(item);
        };

        // Watch pour mettre à jour les valeurs de result pour chaque nouvel item 
        watchEffect(() => {
            for (let i = 0; i < itemArray.value.length; i++) {
                itemArray.value[i].result = itemArray.value[i].quantity * itemArray.value[i].price; // Effectue la multiplication
            }
        });

        // Boucle pour récupérer toutes les valeurs de itemArray.value[i].result pour ensuite
        // Appliquer un reduce qui permet de faire l'accumulation de tous les prix un après l'autre
        const totalItem = computed(() => {
            const totalItemPrice = []
            for (let i = 0; i < itemArray.value.length; i++) {
                totalItemPrice.push(itemArray.value[i].result)
            }
            return totalItemPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        });



        // Remove l'item selon son id et met à jour le tableau itemArray
        const removeLine = (id) => {
            itemArray.value = itemArray.value.filter((i) => i.id !== id);
        }

        // Nous créons ensuite la fonction qui va être appelé au click et qui va permettre d'envoyer
        // un nouvel objet vers le store (=> puis BDD) 
        const newInvoice = () => {
            const newObject = {
                randomName: randomName,
                streetAdress: streetAdress.value,
                city: city.value,
                postCode: postCode.value,
                country: country.value,
                clientName: cName.value,
                email: email.value,
                cStreet: cStreet.value,
                cCity: cCity.value,
                cPostCode: cPostCode.value,
                cCountry: cCountry.value,
                date: date.value,
                paymentTerms: paymentTerms.value,
                description: description.value,
                itemListing: itemArray.value,
                invoiceStatus: invoiceStatus.value,
                total: totalItem.value
            }
            store.addInvoice(newObject)
        }
        return {
            randomName, newInvoice, addItemLine, streetAdress, city, postCode, country,
            cName, email, cStreet, cCity, cPostCode, cCountry, date, paymentTerms,
            description, itemName, quantity, price, itemArray, removeLine, invoiceStatus, result, totalItem, total
        }
    }
}
</script>

<style></style>