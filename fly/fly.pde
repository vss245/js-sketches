int cols, rows;
int scl = 10;
int w = 1500;
int h = 900;
int hour = hour();
//map hour to 0 to 255
color color1 = color(map(hour,0,23,0,255),0,255);
color color2 = color(234, 58, 87);
float[][] terrain;
int min = -35;
int max = 35;
float flying = 0;
  
void setup(){
  size(600,400,P3D);
  cols = w/scl;
  rows = h/scl;
  terrain = new float[cols][rows];
}
void draw(){
 flying -=0.01;
  float yoffset = flying;
      for (int y = 0; y < rows; y++) {
      float xoffset = 0;
      for (int x = 0; x < cols; x++) {
        terrain[x][y] = map(noise(xoffset,yoffset),0,1,min,max);
        xoffset += 0.1;
      }
      yoffset +=0.1;
    }
    
  background(color1);
  //stroke(color2);
  noStroke();
  
  translate(width/2,height/2);
  rotateX(PI/3);
  
  translate(-w/2,-h/2);
  for (int y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (int x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl,(y+1)*scl, terrain[x][y+1]);
      if (terrain[x][y] == min) {
        fill(color1);
      } else if (terrain[x][y] == max) {
        fill(color2);
      } else {
        //calculate interpolation
        color inter = lerpColor(color1,color2,map(terrain[x][y],min,max,0,1));
        fill(inter);
      }
    }
    endShape();
  }
}
