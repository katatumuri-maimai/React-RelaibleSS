#!/usr/bin/python3/python.exe
# coding:utf-8

from flask import Flask, render_template, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import base64
import re
import io as StringIO
import io
from PIL import Image, ImageChops
import json
import sys
import os
from io import BytesIO
import random



app = Flask(__name__, static_folder="./build/static", template_folder="./build")

app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/", methods=['GET'])
def index():
    return "Server OK"

@app.route('/image', methods=['GET', 'POST'])
def parse():
    data = request.get_data()
    data_json =json.loads(data)
    img_64 = data_json["data"]
    image_data = re.sub('^data:image/.+;base64,', '',img_64)
    img_decoded = base64.b64decode(image_data)
    inst = io.BytesIO(img_decoded)
    imag = Image.open(inst)

    im2 = imag.convert('RGB')
    bg = Image.new("RGB", im2.size, im2.getpixel((0, 0)))
    diff = ImageChops.difference(im2, bg)
    croprange = diff.convert("RGB").getbbox()
    nim = imag.crop(croprange)

    buffer = BytesIO()
    nim.save(buffer, format="jpeg")
    img_str = base64.b64encode(buffer.getvalue()).decode()
    img_tag = f'data:image/jpeg;base64,{img_str}'

    return(img_tag)

@app.route("/suffule", methods=['GET', 'POST'])
def suffule():
    data = request.get_data()
    data_json =json.loads(data)
    RoomID =next(iter(data_json))
    file_name = f'data/{RoomID}.json'
    sent_file_name = f'sent/{RoomID}.json'
    in_data_json = data_json[RoomID]
    temp_json = iter(in_data_json)
    member_count = in_data_json[next(temp_json)]
    userId = ""
    data_count=0

    for key in temp_json:
        if key != "member_count":
            userId = key

    in_data_json_dict = in_data_json[userId]

    if(os.path.exists(file_name)):
        with open(file_name, mode='rt', encoding='utf-8') as file:
            exits_json = json.load(file)
            exits_json_data = exits_json[RoomID]
            print('ファイルはあります')


            if(userId in exits_json_data):
                data_count = len(exits_json_data)-1
                print('IDはあります')

            else:
                exits_json_data.update(in_data_json)
                with open(file_name, mode='wt', encoding='utf-8') as file:
                    json.dump(exits_json, file, ensure_ascii=False, indent=2)
                    data_count = len(exits_json_data)-1
                    print("IDがなかったので追加しました。")


    else:
        with open(file_name, mode='wt', encoding='utf-8') as file:
            json.dump(data_json, file, ensure_ascii=False, indent=2)
            print("ファイルはありませんでしたので保存しました。")


    if(int(data_count)==int(member_count)):
        if(os.path.exists(sent_file_name)):
            with open(sent_file_name, mode='rt', encoding='utf-8') as file:
                sent_file = json.load(file)

                print("送るファイルはあるので保存しませんでした")
                return sent_file

        else:
            with open(file_name, mode='rt', encoding='utf-8') as file:
                will_shuffule_json = json.load(file)
                will_shuffule_json_data = will_shuffule_json[RoomID]
                temp_will_shuffule_json_data=will_shuffule_json_data
                keys=[]
                title_list=[]
                gene_list=[]
                member_list=[]
                did_shuffuled_title_list=[]
                did_shuffuled_gene_list=[]
                did_shuffuled_member_list=[]
                did_shuffuled_title_json={}
                did_shuffuled_gene_json={}
                did_shuffuled_member_json={}
                did_shuffuled_list =[]
                did_shuffuled_list_json={}
                tag_list=["Title","Gene","Member"]

                for key in temp_will_shuffule_json_data:
                    if key != "member_count":
                        keys.append(key)

                        for tag in temp_will_shuffule_json_data[key]:
                            if tag == "title":
                                for tag_ch in temp_will_shuffule_json_data[key][tag]:
                                    title_list.append(temp_will_shuffule_json_data[key][tag][tag_ch])

                            if tag == "gene":
                                for tag_ch in temp_will_shuffule_json_data[key][tag]:
                                    gene_list.append(temp_will_shuffule_json_data[key][tag][tag_ch])

                            if tag == "member":
                                member_list.append(temp_will_shuffule_json_data[key][tag])



                did_shuffuled_title_list=random.sample(title_list, 3)
                did_shuffuled_gene_list=random.sample(gene_list, 2)
                did_shuffuled_member_list=random.sample(member_list , len(member_list))

                for i in range(len(did_shuffuled_title_list)):
                    tag = "Title_" + str(i+1)
                    did_shuffuled_title_json[tag]=did_shuffuled_title_list[i]

                for i in range(len(did_shuffuled_gene_list)):
                    tag = "Gene_" + str(i+1)
                    did_shuffuled_gene_json[tag]=did_shuffuled_gene_list[i]

                for i in range(len(did_shuffuled_member_list)):
                    tag = "Member_" + str(i+1)
                    did_shuffuled_member_json[tag]=did_shuffuled_member_list[i]

                did_shuffuled_list_json["Title"]=did_shuffuled_title_json
                did_shuffuled_list_json["Gene"]=did_shuffuled_gene_json
                did_shuffuled_list_json["Member"]=did_shuffuled_member_json

                with open(sent_file_name, mode='wt', encoding='utf-8') as file:
                    json.dump(did_shuffuled_list_json, file, ensure_ascii=False, indent=2)
                    print("送るファイルはありませんでしたので保存しました。")

                with open(sent_file_name, mode='rt', encoding='utf-8') as file:
                    sent_file = json.load(file)

                    return sent_file

    else:
        return None






if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=6060)
