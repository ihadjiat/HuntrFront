enum BusinessRelation {
  Customer = 1,
  Prospect
}

export class Enterprise{


    enterpriseId          :number = 0;
    name                  :string = "";
    relation              :BusinessRelation = 0;
    publicName            :string = "";
    adress1               :string  = "";
    adress2               :string = "";
    city                  :string = "";
    zipCode               :string = "";
    creationYear          :Date | undefined;
    staffSize             :number = 0;
    siret                 :string = "";
    linkedIn              :string = "";
    webSite               :string = "";
    societeDotCom         :string = "";
    introductionSpeech    :string = "";

}
